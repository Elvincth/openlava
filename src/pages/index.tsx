import type { NextPage } from "next";
import Card from "~/components/Card";
import Header from "~/components/Header";

// create data for Card component
const data1 = [
  {
    imageSrc: "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087804/Rectangle_1_czxzau.png",
    title: "Silent Color",
    iconSrc: "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087809/Component_2_s6dsty.png",
    Name: "Pawel Czerwinski",
    Position: "Creator",
  },
]
const data2 = [
  {
    imageSrc: "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087804/Rectangle_1_czxzau.png",
    title: "Silent Color",
    iconSrc: "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087809/Component_2_s6dsty.png",
    Name: "Pawel Czerwinski",
    Position: "Creator",
  },
  {
    imageSrc: "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087804/Rectangle_1_czxzau.png",
    title: "Silent Color",
    iconSrc: "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087809/Component_2_s6dsty.png",
    Name: "Pawel Czerwinski",
    Position: "Creator",
  },
  {
    imageSrc: "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087804/Rectangle_1_czxzau.png",
    title: "Silent Color",
    iconSrc: "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087809/Component_2_s6dsty.png",
    Name: "Pawel Czerwinski",
    Position: "Creator",
  },
]

const Home: NextPage = () => {
  return (
    <div className="flex w-full h-screen flex-col overflow-y-auto">
      <Header />
      <div className="flex flex-col px-40 w-full max-h-[628px] bg-cover bg-[url('https://res.cloudinary.com/dasq4goqg/image/upload/v1645082161/Rectangle_461_lgptjz.png')]" >
        <div className="flex flex-row h-full justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold">Create Your Own Art</h1> <br></br>
            <h1 className="text-2xl font-normal max-w-[300px]">OpenLava is the best NFT marketplace</h1>
            <div className="flex flex-row mt-8">
              <button className=" mr-6 inline-flex items-center justify-center w-full px-12 text-base font-bold leading-6 text-white bg-[#FF6B00] border rounded-xl md:w-auto hover:bg-white hover:text-[#FF6B00] duration-300 hover:border-[#FF6B00]">
                Create
              </button>
              <button className="inline-flex items-center justify-center w-full px-12 py-1.5 text-base font-bold leading-6 text-[#FF6B00] bg-white border border-[#FF6B00] rounded-xl md:w-auto hover:bg-[#FF6B00] hover:text-white duration-300">
                Search
              </button>
            </div>
          </div>
          <div className="flex h-full justify-center items-center">
            <div className="flex max-w-[520px] p-8">
              {data1.map((item) => (
                <Card
                  key={item.imageSrc}
                  imageSrc={item.imageSrc}
                  title={item.title}
                  iconSrc={item.iconSrc}
                  Name={item.Name}
                  Position={item.Position}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3 text-4xl font-bold text-center pt-6 items-center">Art</div>
      {/* map the data2 */}
      <div className="grid grid-cols-3 self-center gap-20 pb-20">
        {data2.map((item) => (
          <Card
            key={item.imageSrc}
            imageSrc={item.imageSrc}
            title={item.title}
            iconSrc={item.iconSrc}
            Name={item.Name}
            Position={item.Position}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
