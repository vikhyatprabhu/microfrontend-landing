import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "auth/AuthApp";

export default ({onSignIn}) => {
  const history = useHistory();
  const ref = useRef(null);
  useEffect(() => {
    const {onParentNavigate}= mount(ref.current, {
      onNavigate: (location) => {
        if (location) {
          const { pathname } = history.location;
          if (pathname !== location.pathname) {
            history.push(location.pathname);
          }
        }
      },
      onSignIn ,
      initialPath:history.location.pathname,
    } );
    history.listen(onParentNavigate);
  },[]);

  return <div ref={ref} />;
};
