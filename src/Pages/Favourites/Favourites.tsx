import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../../Store/store";
import { Tcard } from "../../Types/Tcard"; // Verify that the file exists at this path or adjust the path to the correct location
const Favourites = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [cards, setCards] = useState<
        { _id: string; title: string; subtitle: string; image: { url: string } }[]
    >([]);
    const nav = useNavigate();
    const searchWord = useSelector(
        (state: TRootState) => state.searchSlice.searchWord,
    );
    const user = useSelector((state: TRootState) => state.userSlice.user);

    const filterBySearch = () => {
        return cards.filter((card) => {
            return (
                card.title.toLowerCase().includes(searchWord.toLowerCase()) ||
                card.subtitle.toLowerCase().includes(searchWord.toLowerCase())
            );
        });
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                );

                const likedCards = response.data.filter((item: Tcard) => {
                    return item.likes.includes(user?._id + "");
                }).map((item: Tcard) => ({
                    _id: item._id,
                    title: item.title,
                    subtitle: item.subtitle,
                    image: item.image,

                }));
                setCards(likedCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [user?._id]);

    return (
        <div className="flex flex-col items-center justify-start gap-2 border-4 border-gray-200 shadow  text-gray-600 dark:border-gray-700  dark:bg-gray-800 dark:text-gray-300">
            <h1 className="text-2xl">Favourites Page</h1>

            {cards &&
                filterBySearch().map((card) => (
                    <Card key={card._id}>
                        <img style={{ width: '220px' }} src={card.image.url} alt="" />
                        <h2>{card.title}</h2>
                        <h1>{card.subtitle}</h1>
                        <Button onClick={() => nav("/card/" + card._id)}>Click</Button>
                    </Card>
                ))}

            {loading && (
                <Spinner color="purple" aria-label="Extra large spinner example" size='xl' />
            )}
        </div>
    );
};

export default Favourites;