import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { toast } from "react-toastify";
import { cardSchema } from './ValiOfCreateCard.joi';

const CreateCard = () => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Web, setWeb] = useState("");
    const [City, setCity] = useState("");
    const [Country, setCountry] = useState("");
    const [State, setState] = useState("");
    const [Street, setStreet] = useState("");
    const [HouseNumber, setHouseNumber] = useState<number>(0);
    const [Zip, setZip] = useState(0);


    const nav = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cardData = {
            title,
            subtitle,
            description,
            phone,
            email: Email,
            web: Web,
            image: {
                url: imageUrl,
                alt: imageAlt,
            },
            address: {
                country: Country,
                city: City,
                state: State,
                street: Street,
                houseNumber: HouseNumber,
                zip: Zip,
            },
        };
        const { error } = cardSchema.validate(cardData);

        if (error) {
            toast.error(`Info Not vaild ${error.details[0].message}`);
            return;
        }
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["x-auth-token"] = token;


            await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                cardData,{headers:{'x-auth-token': token}}
            );

            toast.success("הכרטיס נוסף בהצלחה");
            nav("/");
        } catch (error) {
            toast.error("שגיאה ביצירת הכרטיס");
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 p-5 bg-white  dark:border-gray-700 dark:bg-gray-800  rounded-xl shadow text-center justify-center items-center">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white"> Add A Bussniess Card </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                <div className="mb-3 flex flex-row gap-5">
                    <div className="mb-3">
                        <Label htmlFor="title" value="Title" />
                        <TextInput id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <Label htmlFor="subtitle" value="Subtitle " />
                        <TextInput id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
                    </div>

                </div>
                <div className="mb-3">
                    <Label htmlFor="description" value="Description " />

                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="mb-3 flex flex-row gap-2" >
                    <div className="mb-3">
                        <Label htmlFor="phone" value="Phone " />
                        <TextInput id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div   >
                    <div className="mb-3">
                        <Label htmlFor="Email" value=" Email" />
                        <TextInput id="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />



                    </div>

                    <div className="mb-3">
                        <Label htmlFor="Web" value="Web " />

                        <TextInput id="Web" value={Web} onChange={(e) => setWeb(e.target.value)} required />
                    </div>
                </div>
                <div className="mb-3 flex flex-row gap-2" >
                    <div className="mb-3">
                        <Label htmlFor="Image-Url" value="Image Url " />
                        <TextInput id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                    </div   >
                    <div className="mb-3">
                        <Label htmlFor="imageAlt" value=" Image Alt" />
                        <TextInput id="imageAlt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} required />
                    </div>
                </div>
                <div className="mb-3 flex flex-row gap-2" >
                    <div className="mb-3">
                        <Label htmlFor="Country" value="Country " />
                        <TextInput id="Country" value={Country} onChange={(e) => setCountry(e.target.value)} required />
                    </div   >
                    <div className="mb-3">
                        <Label htmlFor="City" value=" City" />
                        <TextInput id="City" value={City} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                </div>

                <div className="mb-3 flex flex-row gap-2" >
                    <div className="mb-3">
                        <Label htmlFor="State" value="State " />
                        <TextInput id="State" value={State} onChange={(e) => setState(e.target.value)} required />
                    </div   >
                    <div className="mb-3">
                        <Label htmlFor="Street" value=" Street" />
                        <TextInput id="Street" value={Street} onChange={(e) => setStreet(e.target.value)} required />
                    </div>
                </div>
                <div className="mb-3 flex flex-row gap-2" >
                    <div className="mb-3">
                        <Label htmlFor="House Number" value="House Number " />
                        <TextInput id="House Number" value={HouseNumber} onChange={(e) => setHouseNumber(Number(e.target.value))} required />
                    </div   >
                    <div className="mb-3">
                        <Label htmlFor="Zip" value=" Zip" />
                        <TextInput id="Zip" value={Zip} onChange={(e) => setZip(Number(e.target.value))} required />
                    </div>
                </div>
                <Button type="submit" color="success">Submit Card</Button>
            </form>
        </div>
    );
};

export default CreateCard;
