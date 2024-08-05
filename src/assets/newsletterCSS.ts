export const css = /*css*/ `/* html {
  color-scheme: light dark;
} */
#u_body {
  margin-inline: auto;
  line-height: 1.55em;
  --container-max-width: 600px;
  --container-margin: 20px max(20px, calc((100% - 600px) / 2));
}
.container {
  display: block !important;
  max-width: var(--container-max-width) !important;
  margin: var(--container-margin);
  padding: 20px;
  clear: both !important;
  /* background-color: #fff; */
  border: 1px solid #aaa;
  border-radius: 3px;
}

.content-block {
  padding: 0 0 20px;
}

td,
p {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

a {
  background-color: transparent;
  color: #348eda;
  text-decoration: underline;
}

b,
strong {
  font-weight: bolder;
}

img {
  border-style: none;
  max-width: 100%;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

table td {
  vertical-align: top;
}

.palabras {
  border-top: 1px solid rgb(238, 199, 39);
  border-bottom: 1px solid rgb(238, 199, 39);
  padding: 20px 50px;
  background-color: #fefdeb;
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.footer {
  max-width: var(--container-max-width);
  margin: var(--container-margin);
  clear: both;
  color: #999;
  padding: 20px;
}

.footer p,
.footer a,
.footer td {
  color: #999;
  font-size: 0.75rem;
}

h1,
h2,
h3 {
  font-family: Arial, 'Helvetica Neue', Helvetica, 'Lucida Grande', sans-serif;
  /* color: #000; */
  margin: 40px 0 1rem 0;
  line-height: 1.2em;
}

h1 {
  font-size: 32px;
  font-weight: 600;
}

h2 {
  font-weight: 600;
  font-size: 24px;
  color: #666600;
  margin-top: 65px;
}

h3 {
  font-size: 18px;
  margin: 40px 0 20px 0;
}

h4 {
  font-size: 17px;
  margin: 40px 0 0 0;
}

h5 {
  font-size: 14px;
  margin: 30px 0 0 0;
}

hr {
  height: 1px;
  border: none;
  color: rgb(238, 199, 39);
  background-color: rgb(238, 199, 39);
  margin-top: 1rem;
}

p,
ul,
ol {
  margin-bottom: 10px;
  font-weight: normal;
}

p li,
ul li,
ol li {
  margin-left: 5px;
  list-style-position: inside;
}

p:has(.btn-primary, .boton) {
  text-align: center;
}

.btn-primary,
.boton {
  text-decoration: none;
  color: #fff;
  background-color: #348eda;
  border: solid #348eda;
  border-width: 10px 20px;
  line-height: 2em;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  text-transform: capitalize;
}

.last {
  margin-bottom: 0;
}

.first {
  margin-top: 0;
}

.text-center {
  text-align: center;
}

.alignright {
  text-align: right;
}

.text-left {
  text-align: left;
}

.clear {
  clear: both;
}

.alert {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  padding: 20px;
  text-align: center;
  border-radius: 3px 3px 0 0;
}

.alert a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
}

.alert.alert-warning {
  background-color: #ff9f00;
}

.alert.alert-bad {
  background-color: #d0021b;
}

.alert.alert-good {
  background-color: #68b90f;
}

.dhamma-blue {
  color: #348eda;
}

mark,
.highlight,
.resaltado {
  background-color: #ee1;
  padding: 0.25rem;
  border-radius: 6px;
  border: 1px solid #dd0;
}

.invoice {
  margin: 20px auto;
  text-align: left;
  width: 80%;
}

.invoice td {
  padding: 5px 0;
}

.invoice .invoice-items {
  width: 100%;
}

.invoice .invoice-items td {
  border-top: #eee 1px solid;
}

.invoice .invoice-items .total td {
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  font-weight: 700;
}

small {
  font-size: 0.75em;
}

.centre-card {
  /* background: color-mix(in oklab, #c18f2c, transparent 85%); */
  /* background: #f6eedf; */
  background: #ffffcc;
  padding: 0;
}

.centre-card img {
  width: 50%;
  float: left;
  margin-right: 1rem;
}

/* @media (prefers-color-scheme: dark) {
  .centre-card {
    background-color: #352c23 !important;
  }
  .highlight,
  .resaltado {
    background-color: #dd1 !important;
    border-color: #cc0 !important;
    color: black !important;
  }
} */

@media only screen and (max-width: 640px) {
  body {
    padding: 0 !important;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 700 !important;
    margin: 20px 0 5px 0 !important;
  }

  h1 {
    font-size: 22px !important;
  }

  h2 {
    font-size: 19px !important;
  }

  h3 {
    font-size: 16px !important;
  }

  h4 {
    font-size: 16px !important;
  }

  .container {
    padding: 0 !important;
    width: 100% !important;
  }

  .content {
    padding: 0 !important;
  }

  .content-wrap {
    padding: 10px !important;
  }

  .palabras {
    border-top: 1px solid rgb(238, 199, 39) !important;
    border-bottom: 1px solid rgb(238, 199, 39) !important;
    padding: 10px 20px !important;
    background: rgb(254, 253, 235) none repeat scroll 0% 50% !important;
    color: rgb(0, 32, 96) !important;
    background-color: #fefdeb !important;
  }

  .invoice {
    width: 100% !important;
  }
}

.d-none {
  display: none;
}

@media screen and (min-width: 576px) {
  .d-md-none {
    display: none;
  }
  .d-md-block {
    display: block;
  }
}
`
