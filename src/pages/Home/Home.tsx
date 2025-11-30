import React from "react";
import "./Home.css";
import logo from "../../assets/logo.png";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <header className="home-top">
          <img src={logo} alt="Grimoire d'Áether" className="home-logo" />
          <h1 className="home-title">Le Grimoire d'Áether</h1>
        </header>

        <main className="home-main">
          <section className="home-section">
            <p className="home-intro">
              Sanctuaire dédié aux cartes divinatoires, symboles cachés et
              enseignements des oracles.
            </p>
          </section>

          <section className="home-section">
            <p>
              Chaque carte révèle son essence : énergies, significations,
              mots-clés et histoire.
            </p>
            <p>
              Chaque jeu est catalogué pour que tu puisses explorer, comparer et
              t'immerger dans ses mystères.
            </p>
          </section>

          <section className="home-section home-section-emphasis">
            <p className="home-emphasis">Ce grimoire est vivant.</p>
            <p>
              Il s'enrichit au fil du temps et s'ouvre à chaque inspiration,
              devenant un compagnon d'étude et un guide pour approfondir ton
              intuition.
            </p>
          </section>

          <section className="home-section home-section-poetic">
            <p className="home-poetic">
              « Ouvrir un grimoire, c'est franchir un seuil. Entre ses pages
              s'entrelacent savoirs anciens, murmures d'âme et éclats
              d'intuition. »
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
