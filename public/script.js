document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('urlInput').value.trim();
  if (query) {
    let url = query;
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    const encodedUrl = __uv$config.encodeUrl(url);
    window.location.href = `${__uv$config.prefix}${encodedUrl}`;
  } else {
    alert('Please enter a URL.');
  }
});