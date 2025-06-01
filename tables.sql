CREATE TABLE IF NOT EXISTS public.partner_products
(
    id serial NOT NULL,
    id_product_name integer,
    id_partner_name integer,
    ammount integer,
    date date,
    CONSTRAINT partner_products_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.partners
(
    id serial NOT NULL,
    partner_type character varying(255) COLLATE pg_catalog."default",
    partner_name character varying(255) COLLATE pg_catalog."default",
    director character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    telephone character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    inn character varying(255) COLLATE pg_catalog."default",
    rating integer,
    CONSTRAINT partners_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.product_type
(
    id serial NOT NULL,
    product_type character varying(255) COLLATE pg_catalog."default",
    coef real,
    CONSTRAINT product_type_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.products
(
    id serial NOT NULL,
    id_product_type integer,
    product_name character varying(255) COLLATE pg_catalog."default",
    articul integer,
    min_price real,
    CONSTRAINT products_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.partner_products
    ADD CONSTRAINT partner_products_id_partner_name_fkey FOREIGN KEY (id_partner_name)
    REFERENCES public.partners (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.partner_products
    ADD CONSTRAINT partner_products_id_product_name_fkey FOREIGN KEY (id_product_name)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.partner_products
    ADD CONSTRAINT partner_products_id_product_name_fkey1 FOREIGN KEY (id_product_name)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.partner_products
    ADD CONSTRAINT partner_products_id_product_name_fkey2 FOREIGN KEY (id_product_name)
    REFERENCES public.partners (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products
    ADD CONSTRAINT products_id_product_type_fkey FOREIGN KEY (id_product_type)
    REFERENCES public.product_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products
    ADD CONSTRAINT products_id_product_type_fkey1 FOREIGN KEY (id_product_type)
    REFERENCES public.product_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;