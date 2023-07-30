const quotesAndLikesUrl = 'http://localhost:3000/quotes?_embed=likes'
const quotesUrl = 'http://localhost:3000/quotes'
const likesUrl = 'http://localhost:3000/likes'

const quoteList = document.getElementById('quote-list')

fetchQuotes()

// render quotes on page
function fetchQuotes() {
    quoteList.innerText = ''
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
    likeBtn.onclick = (e) => {
        e.preventDefault()
        addLike(singleQuote.id)
    }   

    const likeCount = document.createElement('span')
    likeCount.innerText = singleQuote.likes.length

    likeBtn.appendChild(likeCount)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn-danger')
    deleteBtn.innerText = 'Delete ❌'
    deleteBtn.onclick = (e) => {
        e.preventDefault()
        removeQuote(singleQuote.id)
    }   

    blockquote.append(quote, footer, br, likeBtn, deleteBtn)
    
    const quoteCard = document.createElement('li')
    quoteCard.appendChild(blockquote)

    quoteList.append(quoteCard)
}

// submit form to create new quote and add to list
const newQuoteForm = document.getElementById('new-quote-form')
newQuoteForm.onsubmit = (e) => {
    e.preventDefault(),
    renderNewQuote()
    newQuoteForm.reset()
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
    fetchQuotes()
}

// delete quote from database and page
function removeQuote(quoteId) {
    fetch(quotesUrl + '/' + quoteId, {
        method: 'DELETE'
    })
    .then(() => fetchQuotes())
}

// update likes
function addLike(quoteId) {
    fetch(likesUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json',
        },
        body: JSON.stringify({
            quoteId: quoteId
        })
    })
    .then(() => fetchQuotes())
}