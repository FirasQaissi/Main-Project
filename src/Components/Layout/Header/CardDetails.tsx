import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardDetails = () => {
    const [card, setCard] = useState<any>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                const response = await axios.get(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                );

                setCard(response.data);
            } catch (error) {
                console.error("Error fetching card details:", error);
            }
        };

        fetchCardDetails();
    }, [id]);

    return (
        <>
            <div style={{ marginTop: "100px" }} className="text-center text-gray-700  fontfamily: 'Poppins', sans-serif m-auto flex flex-col items-center justify-center gap-4 border-4 border-gray-200 shadow dark:border-gray-700  dark:bg-gray-800 dark:text-gray-300">


                <img src={card?.image?.url} alt="Card Image" className="rounded-lg" style={{ width: "300px", height: "300px" }} />
                <h2 >{card?.title}</h2>
                <h2 >{card?.name}</h2>
                <h2>{card?.subtitle}</h2>
                <h2  >{card?.description}</h2>
                <h2  >{card?.phone}</h2>
                <h2 >{card?.email}</h2>





            </div>
        </>
    );
};

export default CardDetails;