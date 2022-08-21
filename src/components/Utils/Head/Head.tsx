import {default as HeadNext} from 'next/head';

export interface IHeadProps {
    title: string;
    desc?: string;
  }

const Head = (props: IHeadProps) => {
  return (
    <HeadNext>
      <title>{props.title}</title>
      <meta name="description" content={props.desc || 'Kauri.io'} />
      <link rel="icon" href="/favicon.ico" />
    </HeadNext>
  );
};

export default Head;
