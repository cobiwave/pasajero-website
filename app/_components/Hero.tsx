import { stretchPro } from "@/app/fonts/stretch-pro";
import styles from "./Hero.module.css";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
	return (
		<section className={styles.hero} aria-labelledby="hero-title">
			<HeroVideo className={styles.video} />

			{/* Full-bleed media lives on the section; the grid lives inside. */}
			<div className={`container ${styles.content}`}>
				<p className={`${stretchPro.variable} ${styles.name}`}>PASAJERO</p>

				<h1 id="hero-title" className={styles.title}>
					The portal of ephemeral eternity.
				</h1>

				<p className={styles.intro}>
					An independent space for photography, film and conversation. Original
					works and interviews with the people, places and subcultures that live
					between the fleeting and the timeless.
				</p>
			</div>
		</section>
	);
}
