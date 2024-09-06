import { Grid, Pagination } from "@mui/material";
import Card from "./Card";
import { usePagination } from "../../providers/PaginationProvider";

export default function CardGrid({ cards, onChange }) {
  const { start, end, page, setPage, pageCount } = usePagination();

  return (
    <>
      <Grid container spacing={2} paddingY={2}>
        {cards.slice(start, end).map(card => (
          <Grid key={card._id} item xs={12} md={3}>
            <Card id={card._id} ownerId={card.user_id} {...card} onChange={onChange} />
          </Grid>
        ))}
      </Grid>
      {
        pageCount > 1 &&
        <Pagination sx={{ my: 2, paddingBottom: 1.5, display: "flex", justifyContent: "center" }}
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
          size="large"
        />
      }
    </>
  );
}