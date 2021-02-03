import StarIcon from '../Star/Star';
import { useState } from 'react';

export default function VariableRating(props){
   //const {rating} = props

   const [rating, setRating] = useState(0);

   const callBack = (index)=>{
       setRating(index + 1);
   }

    const generateRating = (number) =>{
       var stars = [];

        for (var i = 0; i < 5; i++){
            var index = i + 1;
            if (rating === 0){
                stars.push(<StarIcon key={i} index={i} variable={true} callBack={callBack} />)
            } else
            if ((number % index) !== number){
                stars.push(<StarIcon key={i} index={i} variable={true} filled={true} callBack={callBack} />);
            }else{
                stars.push(<StarIcon key={i} index={i} variable={true} callBack={callBack} />)
            }
        }

        return stars;
    }

    return generateRating(rating);
}