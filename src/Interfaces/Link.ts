export interface Link {
    color: string | null;
    description: string | undefined;
    weight: number | undefined;
    index: number | undefined;
    value: number | undefined;
    source: string;
    target: string;
  }

  export interface LinkD3{
    source: number[];
    target: number[];
    color: string;
    description: string | undefined;
    weight: number;
    index: number | undefined;
    value: number | undefined;
  }