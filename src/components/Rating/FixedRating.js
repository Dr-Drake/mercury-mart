import StarIcon from '../Star/Star';
import { useState } from 'react';

export default function FixedRating(props){
    const {rating} = props

    const generateRating = (number) =>{
        var stars = [];

        for (var i = 0; i < 5; i++){
            var index = i + 1;
            if (rating === 0){
                stars.push(<StarIcon key={i}/>)
            } else
            if ((number % index) !== number){
                stars.push(<StarIcon key={i} filled={true} />);
            }else{
                stars.push(<StarIcon key={i} />)
            }
        }

        return stars;
    }

    return generateRating(rating ? rating : 0);
}