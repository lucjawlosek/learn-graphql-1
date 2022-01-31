import React, {useEffect, Fragment, useState} from "react";
import {useMutation, useSubscription, gql} from "@apollo/client";
import OnlineUser from "./OnlineUser";

const OnlineUsersWrapper = () => {
    let onlineUsersList;
    const {loading, error, data} = useSubscription(
        gql`
       subscription getOnlineUsers {
         online_users(order_by: { user: { name: asc } }) {
           id
           user {
             name
           }
         }
       }
     `
    );

    if (loading) {
        return <span>Loading...</span>;
    }
    if (error) {
        console.error(error);
        return <span>Error!</span>;
    }
    if (data) {
        onlineUsersList = data.online_users.map(u => (
            <OnlineUser key={u.id} user={u.user}/>
        ));
    }

    return (
        <div className="onlineUsersWrapper">
            <Fragment>
                <div className="sliderHeader">
                    Online users - {onlineUsersList.length}
                </div>
                {onlineUsersList}
            </Fragment>
        </div>
    );
};

export default OnlineUsersWrapper;
