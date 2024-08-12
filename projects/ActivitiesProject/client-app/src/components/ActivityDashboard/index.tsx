import { ActivityList } from "..";
import { useEffect, useState } from "react";
import { LoadingComponent } from "..";
import ActivityFilters from "./ActivityFilters";
import { useBoundStore } from "../../stores";
import { PagingParams } from "../../interfaces/Pagination/index.interface";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";

export default function ActivityDashboard() {
  const {
    activityRegistry,
    loadActivities,
    loadingInitial,
    setPagingParams,
    pagination,
  } = useBoundStore();
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, []);

  if (loadingInitial && !loadingNext)
    return <LoadingComponent content="Loading activities" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={
            !loadingNext &&
            !!pagination &&
            pagination.currentPage < pagination.totalPages
          }
          initialLoad={false}
        >
          <ActivityList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width="10">
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
}
