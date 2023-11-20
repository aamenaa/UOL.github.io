
mark {
    background-color: yellow;
    color: black;
}

/* CSS */
.hidden {
    display: none;
}

#search-form {
    position: absolute;
  right: 0;
  top: 100%;
  background-color: rgb(161, 61, 61);
  padding: 10px;
  border: 1px solid #943636;
  border-radius: 4px;
}

#search-form button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: inline-block; /* Remove display: flex */
    position: relative; /* Add position: relative */
}

#search-form button img {
    width: 20px; /* Adjust as needed */
    height: auto;
    position: absolute; /* Add position: absolute */
    top: 50%; /* Position the icon vertically in the button's center */
    transform: translateY(-50%); /* Adjust translateY value to fine-tune the vertical alignment */
    left: 5px; /* Move the icon slightly to the right */
}


/* Modernize Search Input */
#search-form input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%; /* Full width */
    box-sizing: border-box; /* Include padding in width */
    font-size: 16px; /* Larger font size */
}

.search-form-layout {
  display: flex;
  align-items: center;
}

.search-form-layout input,
.search-form-layout button {
  height: 40px;
}

.search-form-layout input {
  flex-grow: 1;
  border: none;
  padding: 8px;
}


/* Styles for the suggestion box */
.suggestion-box {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 8px;
    max-height: 150px;
    overflow-y: auto;
}

/* Styles for each suggestion item */
.suggestion-item {
    padding: 8px;
    cursor: pointer;
}

.suggestion-item:hover {
    background-color: #f0f0f0;
}

/* Scrollbar Styling (optional, adjust colors as needed) */
.suggestion-box::-webkit-scrollbar {
    width: 5px;
}

.suggestion-box::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
}

.suggestion-box::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Styles for highlighted text */
mark {
    background-color: yellow;
    color: black;
}













      <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Elements
            const searchIcon = document.getElementById('search-icon');
            const searchForm = document.getElementById('search-form');
            const searchInput = document.querySelector('#search-form input[type="text"]');
            let suggestionBox = null;
        
            // Debounce function
            const debounce = (func, delay) => {
                let inDebounce;
                return function() {
                    clearTimeout(inDebounce);
                    inDebounce = setTimeout(() => func.apply(this, arguments), delay);
                };
            };
        
            // Fetch suggestions (hardcoded data for demonstration)
            const fetchSuggestions = async (text) => {
                const data = [
                    {"keyword": "Study", "url": "version12.html"},
                    {"keyword": "Example", "url": "version12.html"},
                    {"keyword": "Title", "url": "version13.html"}
                ];
                return data.filter(item => item.keyword.toLowerCase().includes(text.toLowerCase()));
            };
        
                   // Show suggestions
                   const showSuggestions = async (text) => {
    const suggestions = await fetchSuggestions(text);

    if (suggestionBox) suggestionBox.remove();
    suggestionBox = document.createElement('div');
    suggestionBox.className = 'suggestion-box';

    if (suggestions.length) {
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion.keyword;
            div.className = 'suggestion-item';
            div.addEventListener('click', () => {
                // Store the keyword and redirect to the URL with the keyword as a query parameter
                sessionStorage.setItem('searchKeyword', suggestion.keyword);
                window.location.href = suggestion.url + '?search=' + encodeURIComponent(suggestion.keyword);
            });
            suggestionBox.appendChild(div);
        });
    } else {
        const noResult = document.createElement('div');
        noResult.textContent = 'No suggestions found';
        noResult.className = 'no-suggestion';
        suggestionBox.appendChild(noResult);
    }

    searchForm.appendChild(suggestionBox);
};

            // Search icon click event
            searchIcon.addEventListener('click', (event) => {
                event.preventDefault();
                searchForm.classList.toggle('hidden');
            });
        
            // Input event
            searchInput.addEventListener('input', debounce(() => {
                showSuggestions(searchInput.value);
            }, 300));
        
            // Click outside to close suggestion box
            document.addEventListener('click', (event) => {
                if (!searchForm.contains(event.target) && event.target !== searchIcon) {
                    if (suggestionBox) suggestionBox.remove();
                }
            });
        
            // Close suggestions on form submit
            searchForm.addEventListener('submit', () => {
                if (suggestionBox) suggestionBox.remove();
            });
        
            // Check for search keyword in URL
            const queryParams = new URLSearchParams(window.location.search);
            const searchKeyword = queryParams.get('search');
        
            if (searchKeyword) {
                highlightSearchWords(searchKeyword);
                scrollToFirstHighlight();
            }
        
            // Highlight search words and scroll to the first highlight
            function highlightSearchWords(word) {
                const regex = new RegExp(`(${word})`, 'gi');
                document.body.innerHTML = document.body.innerHTML.replace(regex, (match) => `<mark>${match}</mark>`);
            }
        
            function scrollToFirstHighlight() {
                const firstHighlight = document.querySelector('mark');
                if (firstHighlight) {
                    window.scrollTo({
                        top: firstHighlight.offsetTop - window.innerHeight / 2,
                        behavior: 'smooth'
                    });
                }
            }
        });
        </script>
            

            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const queryParams = new URLSearchParams(window.location.search);
                    const searchKeyword = queryParams.get('search');
                
                    if (searchKeyword) {
                        highlightSearchWords(searchKeyword);
                        scrollToFirstHighlight();
                    }
                
                    function highlightSearchWords(word) {
                        const regex = new RegExp(`(${word})`, 'gi');
                        document.body.innerHTML = document.body.innerHTML.replace(regex, (match) => `<mark>${match}</mark>`);
                    }
                
                    function scrollToFirstHighlight() {
                        const firstHighlight = document.querySelector('mark');
                        if (firstHighlight) {
                            firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                });
                </script>
                 

