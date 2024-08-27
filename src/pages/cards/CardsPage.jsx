import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import CardModel from "../../models/CardModel";
import Card from "../../components/cards/Card";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function CardsPage() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [perPage] = useState(24);
  const [cards, setCards] = useState([]);
  const pageCount = useMemo(() => Math.ceil(cards.length / perPage), [cards, perPage]);
  const start = useMemo(() => (page - 1) * perPage, [page, perPage]);
  const end = useMemo(() => start + perPage, [start]);
  const handlePagination = useCallback(page => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }, [searchParams]);

  useEffect(() => {
    CardModel.loadAll().then(cards => {
      setCards([...cards]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  return (
    <>
      <Grid container spacing={2} paddingY={2}>
        {cards.slice(start, end).map(card => (
          <Grid key={card._id} item xs={12} md={3}>
            <Card id={card._id} userId={card.user_id} {...card} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Pagination sx={{ m: 3, paddingBottom: 1.5 }}
          count={pageCount}
          page={page}
          onChange={(_, value) => handlePagination(value)}
          shape="rounded"
          size="large"
        />
      </Box>
    </>
  );
}