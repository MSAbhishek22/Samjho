$path = "b:\Samjho\index.html"
$content = Get-Content $path -Raw -Encoding UTF8

# Remove the duplicate checkBtn conditional that appears after the fallback-input div
# Find the specific substring and remove just the checkBtn line
$toRemove = '
      ${demoState.transcript ? `<button class="btn btn-primary btn-sm hoverable" id="checkBtn" style="margin-top:10px;">${d.submitLabel}</button>` : ``}`'

$replacement = '`'

if ($content.Contains($toRemove)) {
    Write-Host "FOUND - removing checkBtn duplicate"
    $content = $content.Replace($toRemove, $replacement)
    Set-Content $path $content -Encoding UTF8 -NoNewline
    Write-Host "DONE"
} else {
    # Try to find it another way
    $idx = $content.IndexOf("checkBtn")
    if ($idx -gt 0) {
        Write-Host "checkBtn found at $idx, showing context:"
        Write-Host $content.Substring($idx - 100, 300)
    } else {
        Write-Host "checkBtn not found at all"
    }
}
