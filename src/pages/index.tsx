import type { NextPage } from "next";
import Card from "~/components/Card";
import Header from "~/components/Header";

// create data for Card component
const data1 = [
  {
    imageSrc:
      "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087804/Rectangle_1_czxzau.png",
    title: "Silent Color",
    iconSrc:
      "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087809/Component_2_s6dsty.png",
    Name: "Pawel Czerwinski",
    Position: "Creator",
  },
];
const data2 = [
  {
    imageSrc:
      "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087804/Rectangle_1_czxzau.png",
    title: "Silent Color",
    iconSrc:
      "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087809/Component_2_s6dsty.png",
    Name: "Pawel Czerwinski",
    Position: "Creator",
  },
  {
    imageSrc:
      "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087804/Rectangle_1_czxzau.png",
    title: "Silent Color",
    iconSrc:
      "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087809/Component_2_s6dsty.png",
    Name: "Pawel Czerwinski",
    Position: "Creator",
  },
  {
    imageSrc:
      "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087804/Rectangle_1_czxzau.png",
    title: "Silent Color",
    iconSrc:
      "https://res.cloudinary.com/dasq4goqg/image/upload/v1645087809/Component_2_s6dsty.png",
    Name: "Pawel Czerwinski",
    Position: "Creator",
  },
];

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto">
      <Header />
      <section className="flex flex-col lg:px-40 w-full max-h-[580px] bg-cover lg:mb-8 mb-80 bg-[url('https://res.cloudinary.com/dasq4goqg/image/upload/v1645114580/Rectangle_461_amalkp.png')]">
        <div className="flex flex-col justify-between h-full lg:flex-row">
          <div className="flex flex-col items-center justify-center pt-20 pb-12 pl-4 text-center lg:items-start lg:px-0 lg:text-left ">
            <h1 className="text-3xl font-bold lg:text-5xl">
              Create Your Own Art
            </h1>{" "}
            <br></br>
            <h1 className="lg:text-2xl text-lg font-normal max-w-[300px]">
              OpenLava is the best NFT marketplace
            </h1>
            <div className="flex flex-row mt-8">
              <button className=" mr-6 inline-flex items-center justify-center w-full px-12 text-base font-bold leading-6 text-white bg-[#FF6B00] border rounded-xl md:w-auto hover:bg-white hover:text-[#FF6B00] duration-300 hover:border-[#FF6B00]">
                Create
              </button>
              <button className="inline-flex items-center justify-center w-full px-12 py-1.5 text-base font-bold leading-6 text-[#FF6B00] bg-white border border-[#FF6B00] rounded-xl md:w-auto hover:bg-[#FF6B00] hover:text-white duration-300">
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className=" max-w-[520px] lg:p-8">
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
      </section>

      <div className="items-center col-span-3 pt-8 pb-8 text-4xl font-bold text-center lg:pt-6">
        Art
      </div>
      {/* map the data2 */}
      <section className="grid self-center grid-cols-1 gap-20 pb-20 lg:grid-cols-3 md:grid-cols-2">
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
      </section>
    </div>
  );
};

export default Home;
