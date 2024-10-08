import { useCallback, useState } from "react";
import { useLoadEffect, usePageUI } from "../providers/PageUIProvider";
import CardModel from "../models/CardModel";
import HeroSection from "../components/sections/HeroSection";
import CardsSection from "../components/sections/CardsSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import CallToActionSection from "../components/sections/CallToActionSection";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function HomePage() {
  const [cards, setCards] = useState([]);

  const { setNotificationMessage } = usePageUI();

  const loadCards = useCallback(async () => {
    const cards = await CardModel.loadAll();
    setCards(cards.sort((a, b) => b.likes.length - a.likes.length).slice(0, 4));
  }, []);

  useDocumentTitle("LeCard - Home");

  useLoadEffect(async () => {
    const isCached = !!CardModel.cache.all;
    await loadCards();
    !isCached && setNotificationMessage("Business cards loaded successfully.");
  }, []);

  return (
    <>
      <HeroSection />
      <CardsSection cards={cards} onChange={loadCards} />
      <HowItWorksSection />
      <CallToActionSection />
    </>
  );
}
