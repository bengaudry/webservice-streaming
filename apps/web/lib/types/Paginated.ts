export type Paginated<T extends any> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    links: Array<{ url: string | null; label: string, page: number; active: boolean }>;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
};
