--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

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

--
-- Name: spalsp; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE spalsp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';


ALTER DATABASE spalsp OWNER TO postgres;

\connect spalsp

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
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    name character varying NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.countries ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: dictionaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dictionaries (
    id integer NOT NULL,
    name character varying NOT NULL,
    path_id integer NOT NULL,
    content json NOT NULL
);


ALTER TABLE public.dictionaries OWNER TO postgres;

--
-- Name: dictionaries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.dictionaries ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.dictionaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents (
    id integer NOT NULL,
    name character varying NOT NULL,
    path_id integer NOT NULL,
    content text NOT NULL
);


ALTER TABLE public.documents OWNER TO postgres;

--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.documents ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: domains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domains (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.domains OWNER TO postgres;

--
-- Name: domains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.domains ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.domains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: lsps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lsps (
    id integer NOT NULL,
    name character varying NOT NULL,
    path_id integer NOT NULL,
    content json NOT NULL
);


ALTER TABLE public.lsps OWNER TO postgres;

--
-- Name: lsps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lsps ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.lsps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ontologies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ontologies (
    id integer NOT NULL,
    name character varying NOT NULL,
    path_id integer NOT NULL,
    content json NOT NULL
);


ALTER TABLE public.ontologies OWNER TO postgres;

--
-- Name: ontologies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ontologies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ontologies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: paths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paths (
    id integer NOT NULL,
    country_id integer,
    style_id integer,
    category_id integer,
    domain_id integer,
    subdomain_id integer,
    user_id integer
);


ALTER TABLE public.paths OWNER TO postgres;

--
-- Name: paths_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.paths ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.paths_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: styles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.styles (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.styles OWNER TO postgres;

--
-- Name: styles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.styles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.styles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: subdomains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subdomains (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.subdomains OWNER TO postgres;

--
-- Name: subdomains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.subdomains ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.subdomains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying,
    last_name character varying,
    role_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (name, id) OVERRIDING SYSTEM VALUE VALUES ('Извлечение синонимов', 1);
INSERT INTO public.categories (name, id) OVERRIDING SYSTEM VALUE VALUES ('NER', 2);
INSERT INTO public.categories (name, id) OVERRIDING SYSTEM VALUE VALUES ('Извлечение гипо- гипернимов', 3);


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.countries (id, name) OVERRIDING SYSTEM VALUE VALUES (1, 'Россия');
INSERT INTO public.countries (id, name) OVERRIDING SYSTEM VALUE VALUES (2, 'Китай');


--
-- Data for Name: dictionaries; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.documents (id, name, path_id, content) OVERRIDING SYSTEM VALUE VALUES (1, 'Док1', 1, 'Это первый документ.');
INSERT INTO public.documents (id, name, path_id, content) OVERRIDING SYSTEM VALUE VALUES (2, 'Док2', 2, 'Это второй документ.');


--
-- Data for Name: domains; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.domains (id, name) OVERRIDING SYSTEM VALUE VALUES (1, 'Техническая документация');
INSERT INTO public.domains (id, name) OVERRIDING SYSTEM VALUE VALUES (2, 'Статьи иноагентов');
INSERT INTO public.domains (id, name) OVERRIDING SYSTEM VALUE VALUES (3, 'Русская проза');


--
-- Data for Name: lsps; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.lsps (id, name, path_id, content) OVERRIDING SYSTEM VALUE VALUES (1, 'ЛСШ1', 1, '{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}');
INSERT INTO public.lsps (id, name, path_id, content) OVERRIDING SYSTEM VALUE VALUES (2, 'ЛСШ2', 2, '{
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}');


--
-- Data for Name: ontologies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ontologies (id, name, path_id, content) OVERRIDING SYSTEM VALUE VALUES (1, 'Тестовая1', 1, '{
    "last_id": "58",
    "namespaces": {
        "default": "http://knova.ru/user/1703018883713",
        "ontolis-avis": "http://knova.ru/ontolis-avis",
        "owl": "http://www.w3.org/2002/07/owl",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema",
        "xsd": "http://www.w3.org/2001/XMLSchema"
    },
    "nodes": [
        {
            "attributes": {
            },
            "id": "1",
            "name": "Техническая документация",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 758,
            "position_y": 468
        },
        {
            "attributes": {
            },
            "id": "2",
            "name": "Технические акты",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 752,
            "position_y": 564
        },
        {
            "attributes": {
            },
            "id": "5",
            "name": "По вопросу",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 669,
            "position_y": 712
        },
        {
            "attributes": {
            },
            "id": "6",
            "name": "Дата",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 476,
            "position_y": 619
        },
        {
            "attributes": {
            },
            "id": "7",
            "name": "Описание работ",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 847,
            "position_y": 745
        },
        {
            "attributes": {
            },
            "id": "11",
            "name": "#Старт",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 769,
            "position_y": 367
        },
        {
            "attributes": {
            },
            "id": "31",
            "name": "#Дата",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 420,
            "position_y": 373
        },
        {
            "attributes": {
            },
            "id": "33",
            "name": "#Имя сущности",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 1045,
            "position_y": 375
        },
        {
            "attributes": {
            },
            "id": "35",
            "name": "Дата проведения работ и стадия эксплуатации изделия:",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 122,
            "position_y": 749
        },
        {
            "attributes": {
            },
            "id": "39",
            "name": "Промывка",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 1036,
            "position_y": 819
        },
        {
            "attributes": {
            },
            "id": "41",
            "name": "[А-Яа-я]*[а-я ]*температур[а-я]?",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 1086,
            "position_y": 940
        },
        {
            "attributes": {
            },
            "id": "43",
            "name": "Отбор",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 799,
            "position_y": 847
        },
        {
            "attributes": {
            },
            "id": "45",
            "name": "[А-Яа-я]* отбор проб[а-я]?",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 774,
            "position_y": 948
        },
        {
            "attributes": {
            },
            "id": "49",
            "name": "Проверка момента затяжки",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 421,
            "position_y": 851
        },
        {
            "attributes": {
            },
            "id": "55",
            "name": "Проверка [а-я ]* (?:с|со|без) [а-я]*",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": 387,
            "position_y": 957
        }
    ],
    "relations": [
        {
            "attributes": {
            },
            "destination_node_id": "1",
            "id": "4",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "2"
        },
        {
            "attributes": {
            },
            "destination_node_id": "2",
            "id": "8",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "5"
        },
        {
            "attributes": {
            },
            "destination_node_id": "2",
            "id": "9",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "6"
        },
        {
            "attributes": {
            },
            "destination_node_id": "2",
            "id": "10",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "7"
        },
        {
            "attributes": {
            },
            "destination_node_id": "1",
            "id": "12",
            "name": "",
            "namespace": "",
            "source_node_id": "11"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "34",
            "name": "",
            "namespace": "",
            "source_node_id": "33"
        },
        {
            "attributes": {
            },
            "destination_node_id": "6",
            "id": "36",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "35"
        },
        {
            "attributes": {
            },
            "destination_node_id": "6",
            "id": "38",
            "name": "",
            "namespace": "",
            "source_node_id": "31"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "40",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "39"
        },
        {
            "attributes": {
            },
            "destination_node_id": "39",
            "id": "42",
            "name": "pattern",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "41"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "44",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "43"
        },
        {
            "attributes": {
            },
            "destination_node_id": "43",
            "id": "46",
            "name": "pattern",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "45"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "50",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "49"
        },
        {
            "attributes": {
            },
            "destination_node_id": "49",
            "id": "56",
            "name": "pattern",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "55"
        }
    ],
    "visualize_ont_path": ""
}
');
INSERT INTO public.ontologies (id, name, path_id, content) OVERRIDING SYSTEM VALUE VALUES (2, 'Тестовая2', 2, '{
    "last_id": "56",
    "namespaces": {
        "default": "http://knova.ru/user/1703018883713",
        "ontolis-avis": "http://knova.ru/ontolis-avis",
        "owl": "http://www.w3.org/2002/07/owl",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema",
        "xsd": "http://www.w3.org/2001/XMLSchema"
    },
    "nodes": [
        {
            "attributes": {
            },
            "id": "1",
            "name": "Техническая документация",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -913,
            "position_y": -922
        },
        {
            "attributes": {
            },
            "id": "2",
            "name": "Технические акты",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -883,
            "position_y": -781
        },
        {
            "attributes": {
            },
            "id": "5",
            "name": "По вопросу",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -800,
            "position_y": -569
        },
        {
            "attributes": {
            },
            "id": "6",
            "name": "Дата",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1488,
            "position_y": -671
        },
        {
            "attributes": {
            },
            "id": "7",
            "name": "Описание работ",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1092,
            "position_y": -585
        },
        {
            "attributes": {
            },
            "id": "11",
            "name": "#Старт",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -879,
            "position_y": -1089
        },
        {
            "attributes": {
            },
            "id": "17",
            "name": "Проверка",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1034,
            "position_y": -381
        },
        {
            "attributes": {
            },
            "id": "19",
            "name": "Выполнение",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -827,
            "position_y": -378
        },
        {
            "attributes": {
            },
            "id": "21",
            "name": "Проведена проверка",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1211,
            "position_y": -198
        },
        {
            "attributes": {
            },
            "id": "23",
            "name": "для проверки",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1001,
            "position_y": -193
        },
        {
            "attributes": {
            },
            "id": "25",
            "name": "Выполнен монтаж",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -861,
            "position_y": -188
        },
        {
            "attributes": {
            },
            "id": "27",
            "name": "Выполнен демонтаж",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -634,
            "position_y": -197
        },
        {
            "attributes": {
            },
            "id": "31",
            "name": "#Дата",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1748,
            "position_y": -739
        },
        {
            "attributes": {
            },
            "id": "33",
            "name": "#Имя сущности",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1196,
            "position_y": -920
        },
        {
            "attributes": {
            },
            "id": "35",
            "name": "Дата проведения работ и стадия эксплуатации изделия:",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1732,
            "position_y": -498
        },
        {
            "attributes": {
            },
            "id": "39",
            "name": "Промывка",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -435,
            "position_y": -364
        },
        {
            "attributes": {
            },
            "id": "43",
            "name": "Отбор",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -213,
            "position_y": -381
        },
        {
            "attributes": {
            },
            "id": "47",
            "name": "Промывка",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -386,
            "position_y": -143
        },
        {
            "attributes": {
            },
            "id": "49",
            "name": "Проверка момента затяжки",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1549,
            "position_y": -292
        },
        {
            "attributes": {
            },
            "id": "51",
            "name": "Проверка момента затяжки с фиксацией",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1706,
            "position_y": -190
        },
        {
            "attributes": {
            },
            "id": "53",
            "name": "Проверка момента затяжки без фиксации",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1655,
            "position_y": -118
        },
        {
            "attributes": {
            },
            "id": "55",
            "name": "Проверка момента затяжки со жгутом",
            "namespace": "http://knova.ru/user/1703018883713",
            "position_x": -1533,
            "position_y": -50
        }
    ],
    "relations": [
        {
            "attributes": {
            },
            "destination_node_id": "1",
            "id": "4",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "2"
        },
        {
            "attributes": {
            },
            "destination_node_id": "2",
            "id": "8",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "5"
        },
        {
            "attributes": {
            },
            "destination_node_id": "2",
            "id": "9",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "6"
        },
        {
            "attributes": {
            },
            "destination_node_id": "2",
            "id": "10",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "7"
        },
        {
            "attributes": {
            },
            "destination_node_id": "1",
            "id": "12",
            "name": "",
            "namespace": "",
            "source_node_id": "11"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "18",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "17"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "20",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "19"
        },
        {
            "attributes": {
            },
            "destination_node_id": "17",
            "id": "22",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "21"
        },
        {
            "attributes": {
            },
            "destination_node_id": "17",
            "id": "24",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "23"
        },
        {
            "attributes": {
            },
            "destination_node_id": "19",
            "id": "26",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "25"
        },
        {
            "attributes": {
            },
            "destination_node_id": "19",
            "id": "28",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "27"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "34",
            "name": "",
            "namespace": "",
            "source_node_id": "33"
        },
        {
            "attributes": {
            },
            "destination_node_id": "6",
            "id": "36",
            "name": "",
            "namespace": "",
            "source_node_id": "35"
        },
        {
            "attributes": {
            },
            "destination_node_id": "6",
            "id": "38",
            "name": "",
            "namespace": "",
            "source_node_id": "31"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "40",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "39"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "44",
            "name": "a_part_of",
            "namespace": "http://knova.ru/user/1703018883713",
            "source_node_id": "43"
        },
        {
            "attributes": {
            },
            "destination_node_id": "39",
            "id": "48",
            "name": "",
            "namespace": "",
            "source_node_id": "47"
        },
        {
            "attributes": {
            },
            "destination_node_id": "7",
            "id": "50",
            "name": "",
            "namespace": "",
            "source_node_id": "49"
        },
        {
            "attributes": {
            },
            "destination_node_id": "49",
            "id": "52",
            "name": "",
            "namespace": "",
            "source_node_id": "51"
        },
        {
            "attributes": {
            },
            "destination_node_id": "49",
            "id": "54",
            "name": "",
            "namespace": "",
            "source_node_id": "53"
        },
        {
            "attributes": {
            },
            "destination_node_id": "49",
            "id": "56",
            "name": "",
            "namespace": "",
            "source_node_id": "55"
        }
    ],
    "visualize_ont_path": ""
}
');


--
-- Data for Name: paths; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.paths (id, country_id, style_id, category_id, domain_id, subdomain_id, user_id) OVERRIDING SYSTEM VALUE VALUES (4, 1, 2, 3, 1, 2, NULL);
INSERT INTO public.paths (id, country_id, style_id, category_id, domain_id, subdomain_id, user_id) OVERRIDING SYSTEM VALUE VALUES (3, 1, 2, 3, 1, 1, NULL);
INSERT INTO public.paths (id, country_id, style_id, category_id, domain_id, subdomain_id, user_id) OVERRIDING SYSTEM VALUE VALUES (1, 1, 1, 1, 2, 1, NULL);
INSERT INTO public.paths (id, country_id, style_id, category_id, domain_id, subdomain_id, user_id) OVERRIDING SYSTEM VALUE VALUES (2, 1, 1, 2, 2, 1, NULL);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles (id, role) OVERRIDING SYSTEM VALUE VALUES (1, 'admin');
INSERT INTO public.roles (id, role) OVERRIDING SYSTEM VALUE VALUES (2, 'user');


--
-- Data for Name: styles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.styles (id, name) OVERRIDING SYSTEM VALUE VALUES (1, 'Публицистический');
INSERT INTO public.styles (id, name) OVERRIDING SYSTEM VALUE VALUES (2, 'Официально-деловой');
INSERT INTO public.styles (id, name) OVERRIDING SYSTEM VALUE VALUES (3, 'Художественный');


--
-- Data for Name: subdomains; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subdomains (id, name) OVERRIDING SYSTEM VALUE VALUES (1, 'Технические акты');
INSERT INTO public.subdomains (id, name) OVERRIDING SYSTEM VALUE VALUES (2, 'ГОСТ');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, email, password, first_name, last_name, role_id) OVERRIDING SYSTEM VALUE VALUES (1, 'a@b.c', 'abc', 'Super', 'Admin', 1);
INSERT INTO public.users (id, email, password, first_name, last_name, role_id) OVERRIDING SYSTEM VALUE VALUES (2, 'fullofevilclowns@mail.ru', 'abc', 'Анна', 'Никитина', 2);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 2, true);


--
-- Name: dictionaries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dictionaries_id_seq', 1, false);


--
-- Name: documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documents_id_seq', 2, true);


--
-- Name: domains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.domains_id_seq', 3, true);


--
-- Name: lsps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lsps_id_seq', 2, true);


--
-- Name: ontologies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ontologies_id_seq', 2, true);


--
-- Name: paths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paths_id_seq', 4, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: styles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.styles_id_seq', 3, true);


--
-- Name: subdomains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subdomains_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- Name: countries countries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pk PRIMARY KEY (id);


--
-- Name: dictionaries dictionaries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionaries
    ADD CONSTRAINT dictionaries_pk PRIMARY KEY (id);


--
-- Name: documents documents_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pk PRIMARY KEY (id);


--
-- Name: domains domains_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_pk PRIMARY KEY (id);


--
-- Name: lsps lsps_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lsps
    ADD CONSTRAINT lsps_pk PRIMARY KEY (id);


--
-- Name: ontologies ontologies_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ontologies
    ADD CONSTRAINT ontologies_pk PRIMARY KEY (id);


--
-- Name: paths paths_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT paths_pk PRIMARY KEY (id);


--
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (id);


--
-- Name: styles styles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.styles
    ADD CONSTRAINT styles_pk PRIMARY KEY (id);


--
-- Name: subdomains subdomains_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subdomains
    ADD CONSTRAINT subdomains_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk UNIQUE (email);


--
-- Name: users users_pk_2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk_2 PRIMARY KEY (id);


--
-- Name: paths category___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT category___fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: paths country___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT country___fk FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: paths domain___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT domain___fk FOREIGN KEY (domain_id) REFERENCES public.domains(id);


--
-- Name: documents path___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT path___fk FOREIGN KEY (path_id) REFERENCES public.paths(id);


--
-- Name: dictionaries path___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dictionaries
    ADD CONSTRAINT path___fk FOREIGN KEY (path_id) REFERENCES public.paths(id);


--
-- Name: ontologies path___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ontologies
    ADD CONSTRAINT path___fk FOREIGN KEY (path_id) REFERENCES public.paths(id);


--
-- Name: lsps path___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lsps
    ADD CONSTRAINT path___fk FOREIGN KEY (path_id) REFERENCES public.paths(id);


--
-- Name: users role___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT role___fk FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: paths style___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT style___fk FOREIGN KEY (style_id) REFERENCES public.styles(id);


--
-- Name: paths subdomain___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT subdomain___fk FOREIGN KEY (subdomain_id) REFERENCES public.subdomains(id);


--
-- Name: paths user___fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT user___fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

