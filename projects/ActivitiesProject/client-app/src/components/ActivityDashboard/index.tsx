import { ActivityList } from "..";
import { useEffect, useState } from "react";
import ActivityFilters from "./ActivityFilters";
import { useBoundStore } from "../../stores";
import { PagingParams } from "../../interfaces/Pagination/index.interface";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import ActivityListItemPlaceholder from "../ActivityList/ActivityListItemPlaceholder";

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

  return (
    <Grid>
      <Grid.Column width="10">
        {loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
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
        )}
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
