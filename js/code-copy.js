// Hexo Landscape Theme - Code Copy Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Function to create copy button
  function createCopyButton() {
    var button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.type = 'button';
    button.innerText = 'Copy';
    button.title = 'Copy to clipboard';
    
    // Style the button
    button.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 100;
      padding: 4px 12px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s, background 0.3s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    `;
    
    // Add hover effect
    button.addEventListener('mouseenter', function() {
      button.style.opacity = '1';
      button.style.background = 'rgba(0, 0, 0, 0.9)';
    });
    
    button.addEventListener('mouseleave', function() {
      if (!button.classList.contains('copied')) {
        button.style.opacity = '0.8';
      }
    });
    
    return button;
  }
  
  // Function to copy text to clipboard
  function copyToClipboard(text) {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        var successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful ? Promise.resolve() : Promise.reject();
      } catch (err) {
        document.body.removeChild(textArea);
        return Promise.reject(err);
      }
    }
  }
  
  // Process all code blocks
  var codeBlocks = document.querySelectorAll('.highlight');
  
  codeBlocks.forEach(function(preBlock) {
    // Get the code element
    var codeElement = preBlock.querySelector('.code pre');
    if (!codeElement) return;
    
    // Create and add copy button
    var copyButton = createCopyButton();
    preBlock.style.position = 'relative';
    preBlock.appendChild(copyButton);
    
    // Show button on hover
    preBlock.addEventListener('mouseenter', function() {
      copyButton.style.opacity = '0.8';
    });
    
    preBlock.addEventListener('mouseleave', function() {
      if (!copyButton.classList.contains('copied')) {
        copyButton.style.opacity = '0';
      }
    });

    function getCodeText(element) {
        const text = [];
        const lines = element.querySelectorAll('.line')
        for (let i = 0; i < lines.length; i++) {
            text.push(lines[i].innerText);
        }
        return text.join('\n');
    }
    
    // Copy functionality
    copyButton.addEventListener('click', function() {
      var codeText = getCodeText(codeElement);
      
      copyToClipboard(codeText).then(function() {
        // Success
        copyButton.innerText = 'Copied!';
        copyButton.classList.add('copied');
        copyButton.style.background = '#4CAF50';
        copyButton.style.opacity = '1';
        
        // Reset after 2 seconds
        setTimeout(function() {
          copyButton.innerText = 'Copy';
          copyButton.classList.remove('copied');
          copyButton.style.background = 'rgba(0, 0, 0, 0.7)';
          copyButton.style.opacity = '0.8';
        }, 2000);
      }).catch(function(err) {
        // Error
        console.error('Failed to copy: ', err);
        copyButton.innerText = 'Failed';
        copyButton.style.background = '#f44336';
        
        setTimeout(function() {
          copyButton.innerText = 'Copy';
          copyButton.style.background = 'rgba(0, 0, 0, 0.7)';
        }, 2000);
      });
    });
  });
});