import { cloneElement, isValidElement } from "react";

export const addPropsToChildren = (children: any, props: any) => {
    const addPropsToChild = (child: any, props: any) => {
      if (isValidElement(child)) {
        return cloneElement(child, props);
      } else {
        console.log("Invalid element: ", child);
        return child;
      }
    };
    if (Array.isArray(children)) {
      return children.map((child, ix) =>
        addPropsToChild(child, { key: ix, ...props })
      );
    } else {
      return addPropsToChild(children, props);
    }
  };