import { useCallback, useEffect, useState } from "react";
import CardModel from "../../models/CardModel";
import AddCardButton from "../../components/cards/AddCardButton";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useSearch } from "../../providers/SearchProvider";

export default function CardsPage() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const { searchText } = useSearch();
  const { user } = useAuthentication();

  const loadCards = useCallback(async () => {
    const cards = await CardModel.loadAll();
    setCards(cards.filter(card => card.matches(searchText)));
    setLoading(false);
  }, [searchText]);

  useEffect(() => {
    loadCards();
  }, [searchText]);

  return (
    <>
      <PaginationProvider itemCount={cards.length}>
        <CardGrid cards={cards} onChange={loadCards} />
      </PaginationProvider>
      {user?.isBusiness && <AddCardButton />}
    </>
  );
}