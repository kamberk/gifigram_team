import React, { Fragment } from "react";
import { useAlert } from "react-alert";

const Message = () => {
    const alert = useAlert();

    return (
        <Fragment>
            <button
                onClick={() => {
                    alert.show("Oh look, an alert!");
                }}
            >
                Show Alert
      </button>
        </Fragment>
    );
};

export default Message;
