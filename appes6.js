class Book {
    constructor(id, title, author, year) {
        this.id = id
        this.title = title
        this.author = author
        this.year = year
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('bookList')

        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td><a href="#" class="delete">X</a></td>
        <td class="id">${book.id}</td>`

        list.appendChild(row)
    }

    deleteBook(target){
        if (target.className === 'delete'){
            target.parentElement.parentElement.remove()
            const ui = new UI()
            ui.showMessage('Book Removed', 'success')
        }
    }

    showMessage(message, className){
        const div = document.createElement('div')
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.container')
        const form = document.querySelector('#bookForm')
        container.insertBefore(div, form)

        setTimeout(function () {
            document.querySelector('.alert').remove()
        }, 2000)
    }

    clearFields(){
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('year').value = ''
    }
}

class Storage {
    static getBooks(){
        let books
        if (localStorage.getItem('books') === null){
            books = []
        }else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }

    static showBooks(){
        const books = this.getBooks()

        books.forEach(function (book) {
            const ui = new UI()
            //ADD book to ui
            ui.addBookToList(book)
        })
    }

    static addBook(book){
        const books = this.getBooks()

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }

    static deleteBook(id){
       const books = this.getBooks()

       books.forEach(function (book, index){
           if(String(book.id) === id){
               books.splice(index, 1)
           }
       })

       localStorage.setItem('books', JSON.stringify(books))
    }
}

//Event listeners
//DOM loaded
document.addEventListener('DOMContentLoaded', function () {
    Storage.showBooks()
})
//Add book
document.getElementById('bookForm').addEventListener('submit',(event)=>{
    //get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        year = document.getElementById('year').value,
        id = new Date()

    document.getElementById('year').max = new Date().getFullYear()

    //Instantiate a book
    const book = new Book(id, title, author, year)

    //Instantiate UI
    const ui = new UI()

    //Validation
    if(title.trim().length === 0 || author.trim().length === 0 || year === '' ){
        //Show error
        ui.showMessage('Please fill all fields correctly', 'error')
    }else {
        //Add book to list
        ui.addBookToList(book)
        //Add book to storage
        Storage.addBook(book)
        //Sow success
        ui.showMessage('Book successfully added to list', 'success')
        //Clear fields
        ui.clearFields()
    }

    event.preventDefault()
})
//Delete book
document.getElementById('bookList').addEventListener('click', function (event) {
    const ui = new UI()

    ui.deleteBook(event.target)
    Storage.deleteBook(event.target.parentElement.parentElement.lastChild.textContent)

    event.preventDefault()
})