document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('urlInput').value;
  if (query) {
    // Ensure the URL starts with http:// or https://
    let url = query;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Encode the URL for the proxy
    const encodedUrl = __uv$config.encodeUrl(url);

    // Redirect to the proxy
    window.location.href = __uv$config.prefix + encodedUrl;
  }
});