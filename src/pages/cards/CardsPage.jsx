import { useCallback, useEffect, useState } from "react";
import CardModel from "../../models/CardModel";
import AddCardButton from "../../components/cards/AddCardButton";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useSearch } from "../../providers/SearchProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function CardsPage() {
  const [cards, setCards] = useState([]);
  const { searchText } = useSearch();
  const { user } = useAuthentication();
  const { setNotification } = usePageUI();

  const loadCards = useLoadCallback(async () => {
    const cards = await CardModel.loadAll();
    setCards(cards.filter(card => card.matches(searchText)));
  }, [searchText]);

  useEffect(() => {
    loadCards().then(() => setNotification({ message: "Cards loaded", severity: "success" }));
  }, [searchText]);

  return (
    <PageContent>
      <PaginationProvider itemCount={cards.length}>
        <CardGrid cards={cards} onChange={loadCards} />
      </PaginationProvider>
      {user?.isBusiness && <AddCardButton />}
    </PageContent>
  );
}