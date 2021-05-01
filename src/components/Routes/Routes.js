import React from "react";
import { Route, Switch } from "react-router-dom";
import ListEquipments from "../pages/ListEquipments/ListEquipments";
import DetailsPage from "../pages/DetailsPage/DetailsPage";


import {
    LISTEQUIPMENTS,
    DETAILSPAGE,
} from "../../constants/routes";

const Routes = () => {
    return (
        <Switch>
            <Route path={LISTEQUIPMENTS} exact component={ListEquipments} />
            <Route path={DETAILSPAGE} exact component={DetailsPage} />
        </Switch>

    )
};

export default Routes;