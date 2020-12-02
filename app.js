//Book Constructor
function Book (title, author, year){
    this.title = title
    this.author = author
    this.year = year
}

//UI Constructor
function UI(){}

//Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('bookList')

    const row = document.createElement('tr')

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td><a href="#" class="delete">X</a></td>`

    list.appendChild(row)
}

UI.prototype.clearFields = function (){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('year').value = ''
}
//Show message
UI.prototype.showMessage = function (message, className){
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

//Event listener
document.getElementById('bookForm').addEventListener('submit',(event)=>{
    //get form values
    const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
           year = document.getElementById('year').value

    document.getElementById('year').max = new Date().getFullYear()

    //Instantiate a book
    const book = new Book(title, author, year)

    //Instantiate UI
    const ui = new UI()

    //Validation
    if(title.trim().length === 0 || author.trim().length === 0 || year === '' ){
        //Show error
        ui.showMessage('Please fill all fields correctly', 'error')
    }else {
        //Add book to list
        ui.addBookToList(book)

        //Sow success
        ui.showMessage('Book successfully added to list', 'success')

        //Clear fields
        ui.clearFields()
    }

    event.preventDefault()
})