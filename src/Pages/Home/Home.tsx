import axios from "axios";
import { Button, Card, Spinner, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaHeart, FaPhoneAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../../Store/store";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { Tcard } from "../../Types/Tcard";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const cardsPerPage = 16;
  const paginatedCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return filterBySearch().slice(startIndex, endIndex);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const [cards, setCards] = useState<Tcard[]>([]);
  const nav = useNavigate();

  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );

  const filterBySearch = () => {
    return cards.filter((card: Tcard) => {
      return (
        card.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
  };
  const likeOrUnlikeCard = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");

      axios.defaults.headers.common["x-auth-token"] = token;
      await axios.patch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cardId,
      );
      const card = cards.find((card) => card._id === cardId);

      if (card) {
        const isLiked = card.likes.includes(user?._id + "");
        const cardsArr = [...cards];

        if (isLiked) {
          card.likes = card?.likes.filter((like) => like !== user?._id + "");
          const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
          cardsArr[cardIndex] = card;
          toast.success("Card unliked successfully");
        } else {
          card.likes = [...card.likes, user?._id + ""];
          const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
          cardsArr[cardIndex] = card;
          toast.success("Card liked successfully");
        }

        setCards(cardsArr);
      }
    } catch (error) {
      console.log("Error liking/unliking card:", error);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <  >
      <div className="cardsBox">


        <p className=" text-6xl   text-slate-700 mb-4 pt-5  caveat ">Welcome Home!</p>
        <h1 className="text-5xl   text-slate-700 mb-5 caveat" >Here you can find business cards from all categories</h1>

        <div style={{ width: '75vw' }} className=" text-2xl  alumni-sans m-auto flex flex-row flex-wrap items-center justify-center  gap-4  dark:bg-gray-800  p-5 rounded-lg shadow-lg">
          {paginatedCards().map((card) => {
            const isLiked = card.likes.includes(user?._id + "");

            return (
              <Card className=" mb-3 rounded-3xl bg-slate-300 text-black dark:text-white " key={card._id}>
                <img className="size-40 rounded-3xl" src={card.image.url} alt={card.image.alt} />
                <h2>{card.title}</h2>
                <h1>{card.subtitle}</h1>
                <FaPhoneAlt className='m-auto cursor-pointer' />
                <h1>{card.phone}</h1>

                {user && (
                  <span className="text-sm text-gray-500">
                    {card.likes.length} {card.likes.length > 1 ? "likes" : "like"}
                  </span>
                )}

                <FaHeart
                  className={`${isLiked ? "text-red-500" : "text-gray-500"} cursor-pointer m-auto`}
                  onClick={() => likeOrUnlikeCard(card._id)}
                />

                <Button onClick={() => nav("/card/" + card._id)}>Click</Button>
              </Card>

            );
          })}
          {loading && (
            <Button color="alternative">
              <Spinner aria-label="Alternate spinner button example" size="xl" />
              <span className="pl-3">Loading...</span>
            </Button>
          )}
        </div>
        <div className=" mb-4 overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={Math.ceil(filterBySearch().length / cardsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
            previousLabel="Previous"
            nextLabel="Next"
            showIcons={true}
          />

        </div>
      </div>
    </>
  );
};
export default Home;