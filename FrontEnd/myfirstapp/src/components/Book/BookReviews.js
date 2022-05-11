import axios from 'axios';
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { bookMicroServiceApi } from '../../Utilities/hosts';

const BookReviews = ({isbnNum, username}) => {
    const [ratingNum, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    
    //submit review form
    const submit = e =>{
        let rating = ratingNum;
        let statements = e.target[5].value;
        let isbn = isbnNum.trim();
        let reviewerId = username;
        let data = {
            rating,
            statements,
            reviewerId,
            isbn
        };
        //post review
        console.log(data)
        axios.post(bookMicroServiceApi + "/bookreview/addreview", data).then(() => {
            window.location.reload();
        })
    };

    return (
        <div>
            <form onSubmit={(e)=>{
               e.preventDefault();
               submit(e); 
            }}>
            {[ ...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input type="radio" name="ratingNum" value={ratingValue} onClick={() => setRating(ratingValue)}></input>
                        <FaStar className="star" color={ratingValue <= (hover || ratingNum) ? "#ffc107" : "#e4e5e9"} size={35}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}></FaStar>
                    </label>
                    
                );
            })}
            <div>
                <textarea class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-md my-2">Add Review</button>
        </form>
        </div>
    )
}
export default BookReviews;