import Card from "@/app/_components/Common/Card";
import styles from "./map.module.scss";
const props = {
  id: 1,
  imgUrl: "",
  name: "용용선생 선릉점",
  type: "요리주점",
  location: "서울특별시 성동구 마조로3가길 15",
  phone: "02-1234-5678",
  // likes:
};
const recommend = [props, props, props, props, props];
const Map = () => {
  return (
    <main className={styles.main}>
      <section className={styles.map}>map</section>
      <div className={styles.locations}>
        {recommend.map((location, index) => (
          <Card key={location.id} {...location} />
        ))}
      </div>
    </main>
  );
};

export default Map;
