const quotesAndLikesUrl = 'http://localhost:3000/quotes?_embed=likes'
const quotesUrl = 'http://localhost:3000/quotes'

const quoteList = document.getElementById('quote-list')

fetchQuotes()

// render quotes on page
function fetchQuotes() {
    fetch(quotesAndLikesUrl)
    .then(r => r.json())
    .then(data => data.forEach((singleQuote) => renderQuote(singleQuote)))
}

function renderQuote(singleQuote) {
    const blockquote = document.createElement('blockquote')
    blockquote.classList.add('blockquote')

    const quote = document.createElement('p')
    quote.classList.add('mb-0')
    quote.innerText = singleQuote.quote

    const footer = document.createElement('footer')
    footer.classList.add('blockquote-footer')
    footer.innerText = singleQuote.author

    const br = document.createElement('br')

    const likeBtn = document.createElement('button')
    likeBtn.classList.add('btn-success')
    likeBtn.innerText = 'Likes: '

    const likeCount = document.createElement('span')
    likeCount.innerText = 0

    likeBtn.appendChild(likeCount)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn-danger')
    deleteBtn.innerText = 'Delete ❌'

    blockquote.append(quote, footer, br, likeBtn, deleteBtn)
    
    const quoteCard = document.createElement('li')
    quoteCard.appendChild(blockquote)

    quoteList.append(quoteCard)
}

// submit form to create new quote and add to list
const newQuoteForm = document.getElementById('new-quote-form')
newQuoteForm.onsubmit = (e) => {
    e.preventDefault()
    renderNewQuote()
}

function renderNewQuote() {
    const newQuote = document.getElementById('new-quote').value
    const newQuoteAuthor = document.getElementById('author').value

    fetch(quotesUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify({
            quote: newQuote,
            author: newQuoteAuthor
        })
    })
    quoteList.innerText = ''
    fetchQuotes()
}