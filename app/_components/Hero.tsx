"use client";

import { useRef } from "react";
import { clsx } from "clsx";
import { stretchPro } from "@/app/fonts/stretch-pro";
import {
	childrenOf,
	motion,
	revealTimeline,
	splitWords,
	useMotion,
} from "@/app/_lib/motion";
import styles from "./Hero.module.css";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
	const containerRef = useRef<HTMLElement>(null);
	const nameRef = useRef<HTMLParagraphElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const introRef = useRef<HTMLParagraphElement>(null);
	const socialsRef = useRef<HTMLUListElement>(null);

	useMotion(containerRef, {
		full: () => {
			const split = splitWords(titleRef.current);

			revealTimeline()
				.from([nameRef.current, childrenOf(socialsRef.current)], {
					autoAlpha: 0,
					y: 16,
					stagger: motion.stagger.words,
				})
				.from(
					split.words,
					{ yPercent: motion.maskOffset, stagger: motion.stagger.words },
					"<0.2",
				)
				.from(introRef.current, { autoAlpha: 0, y: motion.y }, "<0.5");
		},
	});

	return (
		<section
			data-reveal
			ref={containerRef}
			className={styles.hero}
			aria-labelledby="hero-title"
		>
			<HeroVideo className={styles.video} />

			{/* Full-bleed media lives on the section; the grid lives inside. */}
			<div className={clsx("container", styles.content)}>
				<p ref={nameRef} className={clsx(stretchPro.variable, styles.name)}>
					PASAJERO
				</p>

				{/* External links: plain <a>, since next/link is for internal routes. */}
				<ul
					ref={socialsRef}
					className={styles.socials}
					aria-label="PASAJERO on social media"
				>
					<li>
						<a
							className={styles.social}
							href="https://www.instagram.com/pasajero.studio/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram (opens in a new tab)"
						>
							{/* Drawn at 18/24 so its optical size matches the YouTube glyph. */}
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
								focusable="false"
							>
								<rect x="3" y="3" width="18" height="18" rx="5" />
								<circle cx="12" cy="12" r="4" />
								<circle
									cx="17"
									cy="7"
									r="1.1"
									fill="currentColor"
									stroke="none"
								/>
							</svg>
						</a>
					</li>
					<li>
						<a
							className={styles.social}
							href="https://www.youtube.com/@pasajero.studio"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="YouTube (opens in a new tab)"
						>
							<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
								<path
									fill="currentColor"
									d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
								/>
							</svg>
						</a>
					</li>
				</ul>

				<h1 ref={titleRef} id="hero-title" className={styles.title}>
					The portal of ephemeral eternity.
				</h1>

				<p ref={introRef} className={styles.intro}>
					An independent space for photography, film and conversation. Original
					works and interviews with the people, places and subcultures that live
					between the fleeting and the timeless.
				</p>
			</div>
		</section>
	);
}
