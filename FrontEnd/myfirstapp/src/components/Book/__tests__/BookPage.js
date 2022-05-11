import BookPage from "../BookPage";
import mockAxios from "axios";

// Calls axios and checks if its only been called a single time
it('calls axios and checks if its only been called a single time', async () => {

    // Setup
    mockAxios.get.mockImplementationOnce( () => Promise.resolve({
        data: {
            isbn: "9780747532743",
            title: "Harry Potter and the Philosopher's Stone ",
            authorFirstName: "J.K",
            authorLastName: "Rowling",
            largeCover: "http://covers.openlibrary.org/b/isbn/9780747532743-L.jpg",
            genre: "Adventure",
            mediumCover: "http://covers.openlibrary.org/b/isbn/9780747532743-M.jpg"
        }
    }))
    
    // Work
    const response = await BookPage.prototype.getBookFromApi(9780062390622);

    // Assertion / expects
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
})

// calls axios and returns a book
it('calls axios and returns a book', async () => {

    // Setup
    mockAxios.get.mockImplementationOnce( () => Promise.resolve({
        data: {
            isbn: "9780747532743",
            title: "Harry Potter and the Philosopher's Stone ",
            authorFirstName: "J.K",
            authorLastName: "Rowling",
            largeCover: "http://covers.openlibrary.org/b/isbn/9780747532743-L.jpg",
            genre: "Adventure",
            mediumCover: "http://covers.openlibrary.org/b/isbn/9780747532743-M.jpg"
        }
    }))
    
    // Work
    const response = await BookPage.prototype.getBookFromApi(9780062390622);
    console.log(response);

    // Assertions / expects
    expect(response).toEqual( 
        {data: {
            isbn: "9780747532743",
            title: "Harry Potter and the Philosopher's Stone ",
            authorFirstName: "J.K",
            authorLastName: "Rowling",
            largeCover: "http://covers.openlibrary.org/b/isbn/9780747532743-L.jpg",
            genre: "Adventure",
            mediumCover: "http://covers.openlibrary.org/b/isbn/9780747532743-M.jpg"
        }
    });
})

// Calls axios and checks if its been called using a parameter
it('calls axios and checks if its been called using a parameter', async () => {

    // Setup
    mockAxios.get.mockImplementationOnce( () => Promise.resolve({
        data: {
            isbn: "9780747532743",
            title: "Harry Potter and the Philosopher's Stone ",
            authorFirstName: "J.K",
            authorLastName: "Rowling",
            largeCover: "http://covers.openlibrary.org/b/isbn/9780747532743-L.jpg",
            genre: "Adventure",
            mediumCover: "http://covers.openlibrary.org/b/isbn/9780747532743-M.jpg"
        }
    }))
    
    // Work
    const response = await BookPage.prototype.getBookFromApi(9780062390622);

    // Assertions / expects
    expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:2000/books/9780062390622");
})

// Checks if returns nothing if no isbn is inputted in the parameter
it('calls axios with no parameters (no isbn) and returns nothing', async () => {

    // Setup
    mockAxios.get.mockImplementationOnce( () => Promise.resolve({}))
    
    // Work
    const response = await BookPage.prototype.getBookFromApi();

    // Assertions / expects
    expect(response).toEqual({});
})