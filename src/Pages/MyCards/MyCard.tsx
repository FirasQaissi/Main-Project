import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
import { toast } from "react-toastify";

const MyCards = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchMyCards = async () => {
            try {
                const token = localStorage.getItem("token");

                axios.defaults.headers.common["x-auth-token"] = token;
                if (!token) {
                    toast.error("You are not logged in, please log in to view your cards.");
                    return;
                }
                const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards");
                setCards(res.data);
                console.log("My cards:", res.data);
            } catch (error) {
                toast.error("something went wrong while fetching your cards");
                console.error(error);
            }
        };

        fetchMyCards();
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">My Cards...</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black dark:text-white">
                {cards.map((card: any) => (
                    <Card key={card._id} className="bg-white dark:bg-gray-800 shadow-lg p-4">
                        {card.image?.url && (
                            <img src={card.image.url} className="w-full h-48 object-cover mb-4 rounded" />
                        )}
                        <h5 className="text-xl font-bold">{card.title}</h5>
                        <p>{card.subtitle}</p>
                        <p>{card.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MyCards;
