import { fetchActor } from "@/lib/data";
import styles from "./profile.module.css";

export const Profile = async ({ id }: { id: number }) => {
  const actor = await fetchActor(id);

  return (
    <section className={styles.Profile}>
      <img
        width={300}
        height={300}
        src={actor.profileImageUrl}
        alt={actor.name}
        style={{ objectFit: "cover" }}
      />
      <div className={styles.Bio}>
        <div className={styles.Name}>
          <h2>{actor.name}</h2>
          <a href={`https://www.imdb.com/name/${actor.imdbId}`} target="_blank">
            <img width={50} height={20} src="/imdb_logo.svg" alt="IMDB logo" />
          </a>
        </div>
        <h5>{actor.biography}</h5>
      </div>
    </section>
  );
};
