function loadContent(file, containerId) {
    document.addEventListener('DOMContentLoaded', function() {
      const container = document.getElementById(containerId);
      
      if (container) {
        fetch(file)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
          })
          .then(data => {
            container.innerHTML = data;
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }
    });
  }