--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-03-25 14:47:50

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 6396085)
-- Name: products; Type: TABLE; Schema: anniesattic; Owner: -
--

CREATE TABLE anniesattic.products (
    idproducts integer NOT NULL,
    media_type_idmedia_type integer NOT NULL,
    dimensions character varying(50),
    quantity integer NOT NULL,
    price money NOT NULL,
    description character varying(512),
    img_url character varying(512) NOT NULL,
    title character varying(256) NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 6396083)
-- Name: products_idproducts_seq; Type: SEQUENCE; Schema: anniesattic; Owner: -
--

CREATE SEQUENCE anniesattic.products_idproducts_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3997 (class 0 OID 0)
-- Dependencies: 211
-- Name: products_idproducts_seq; Type: SEQUENCE OWNED BY; Schema: anniesattic; Owner: -
--

ALTER SEQUENCE anniesattic.products_idproducts_seq OWNED BY anniesattic.products.idproducts;


--
-- TOC entry 3859 (class 2604 OID 6396088)
-- Name: products idproducts; Type: DEFAULT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.products ALTER COLUMN idproducts SET DEFAULT nextval('anniesattic.products_idproducts_seq'::regclass);


--
-- TOC entry 3990 (class 0 OID 6396085)
-- Dependencies: 212
-- Data for Name: products; Type: TABLE DATA; Schema: anniesattic; Owner: -
--

COPY anniesattic.products (idproducts, media_type_idmedia_type, dimensions, quantity, price, description, img_url, title) FROM stdin;
1	1	20x20	20	$20.00	A Giant red mechnical bull with a man below it.	img/f05c82111541689.60041b9f63641-thumb.png	Red Bull
2	1	15x20	15	$25.00	A town built on some mountainous cliffs with bridges connecting the buildings.	img/jbCNvTM4gwr2qV8X8fW3ZB-970-80-thumb.png	Town on the Cliffs
3	1	10x10	25	$15.00	A big green orc with a large club	img/orc07-thumb.png	Green Orc
4	1	10x15	19	$10.00	An array of planets seen from the surface of a cratered moon.	img/pixelart_P1_900x420-thumb.png	Space from a Moon
\.


--
-- TOC entry 3998 (class 0 OID 0)
-- Dependencies: 211
-- Name: products_idproducts_seq; Type: SEQUENCE SET; Schema: anniesattic; Owner: -
--

SELECT pg_catalog.setval('anniesattic.products_idproducts_seq', 4, true);


--
-- TOC entry 3861 (class 2606 OID 6396090)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (idproducts);


--
-- TOC entry 3862 (class 2606 OID 6396109)
-- Name: products products_media_type_idmedia_type_fkey; Type: FK CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.products
    ADD CONSTRAINT products_media_type_idmedia_type_fkey FOREIGN KEY (media_type_idmedia_type) REFERENCES anniesattic.media_type(idmedia_type) NOT VALID;


--
-- TOC entry 3996 (class 0 OID 0)
-- Dependencies: 674
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON LANGUAGE plpgsql TO osmlfjpdadfgto;


-- Completed on 2021-03-25 14:47:58

--
-- PostgreSQL database dump complete
--

