import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { HomeContainerProps } from "./Home.props";
import useSelectorSafe from "store/selectors/useSelectorSafe";
import { authThunks } from "store/thunks";
import { UserState } from "types/Store/UserState";
import { ASYNC_STATUS } from "types/Store/AsyncStatus";
import { asyncData } from "utils/ReduxUtils";
import { routerActions } from "store/actions";
import { ROUTES } from "consts";

const userFallback: UserState = asyncData(ASYNC_STATUS.ERROR, ['Could not load user']);

const HomeContainer: FC<HomeContainerProps> = (
  { View, ...props }: HomeContainerProps,
) => {
  const {
    data: user,
    status,
    errors,
  } = useSelectorSafe<UserState>((state) => state.user, userFallback);
  const dispatch = useDispatch();

  return <View {...props} {...{
    loading: status === ASYNC_STATUS.LOADING,
    user,
    errors,
    toProfile: (slug: string) => dispatch(routerActions.link(ROUTES.EXAMPLE, { slug })),
    login: () => dispatch(authThunks.login("your@email.com")),
  }} />;
};

export default HomeContainer;
