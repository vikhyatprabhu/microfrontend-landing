import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
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
    });
    history.listen(onParentNavigate);
  },[]);

  return <div ref={ref} />;
};
