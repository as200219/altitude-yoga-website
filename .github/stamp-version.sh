#!/usr/bin/env bash
# Stamps the site version and last-update time into every page footer of an assembled site.
#   usage: .github/stamp-version.sh <site-dir>
# Version: the first "## x.y" heading in CHANGELOG.md.
# Updated: when the published commit was made, in Eastern time. Node does the conversion:
# it carries its own time-zone data (Git Bash's date has none and silently prints UTC).
# Each page's footer holds <!--site-version-->…<!--/site-version-->; the text between the
# markers is replaced. Also writes <site-dir>/version.json for a quick check.
set -euo pipefail

site="${1:?site directory}"
version="$(grep -m1 -oE '^## [0-9]+\.[0-9]+' CHANGELOG.md | cut -c4- || true)"
if [ -z "$version" ]; then
  echo "No '## x.y' version heading in CHANGELOG.md" >&2
  exit 1
fi

commit_epoch="$(git log -1 --format=%ct)"
# Line 1: "Oct 25, 2026 at 12:50 PM ET"; line 2: ISO time with the Eastern offset.
eastern="$(node -e '
  const at = new Date(Number(process.argv[1]) * 1000);
  const fmt = (locale, opts) => new Intl.DateTimeFormat(locale, { timeZone: "America/New_York", ...opts })
    .format(at).replace(/[  ]/g, " ");
  const offset = fmt("en-US", { timeZoneName: "longOffset" }).split("GMT")[1] || "+00:00";
  const ymd = fmt("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
  const hms = fmt("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
  console.log(`${fmt("en-US", { month: "short", day: "numeric", year: "numeric" })} at ${fmt("en-US", { hour: "numeric", minute: "2-digit" })} ET`);
  console.log(`${ymd}T${hms}${offset}`);
' "$commit_epoch")"
{ IFS= read -r updated; IFS= read -r updated_iso; } <<< "$eastern"
line="Version ${version} · Updated ${updated}"

missing=0
for page in "$site"/*.html; do
  if ! grep -q '<!--site-version-->' "$page"; then
    echo "No version marker in the footer of $(basename "$page")" >&2
    missing=1
    continue
  fi
  sed -i "s#<!--site-version-->[^<]*<!--/site-version-->#<!--site-version-->${line}<!--/site-version-->#" "$page"
done
[ "$missing" -eq 0 ] || exit 1

printf '{\n  "version": "%s",\n  "updated": "%s",\n  "updatedEastern": "%s",\n  "commit": "%s"\n}\n' \
  "$version" "$updated_iso" "$updated" "$(git rev-parse HEAD)" > "$site/version.json"
echo "$line"
