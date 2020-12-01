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

UI.prototype.clearFields =function (){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('year').value = ''
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

    //Add book to list
    ui.addBookToList(book)

    //Clear fields
    ui.clearFields()

    event.preventDefault()
})