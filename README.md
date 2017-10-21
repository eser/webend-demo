# [webend-demo](https://github.com/eserozvataf/webend-demo)

[Webend](http://webend.org) Backend Teknolojileri Konferansı 2017/2'de sunacak olduğum "Hangi ihtiyaçlarla Serverless'a yöneldik?" konuşmasının demo sunumudur.

## Çalıştırmak için adımlar:

- Öncelikle sisteminizde node.js'in ve git komut satırı araçlarının kurulu olduğundan emin olun,

```sh
$ npm install serverless -g
```

- Amazon Web Services'dan Access Keylerinizi temin edin,

```sh
$ serverless config credentials --provider aws --key KEY --secret SECRET
```

veya halihazırda `aws-cli` kullanıcısıysanız

```sh
$ aws configure
AWS Access Key ID [None]: KEY
AWS Secret Access Key [None]: SECRET
Default region name [None]: eu-west-1
Default output format [None]: 
```

komutları ile AWS hesabınızı serverless.js'e tanıtın.

- Bu demoyu git aracılığı ile klonlayın.

```sh
$ git clone https://github.com/eserozvataf/webend-demo
$ cd webend-demo
```

- Demo klasörüne npm bağımlılıklarını indirin.

```sh
$ npm install
```

- `.env.default` dosyasının bir kopyasını oluşturup `.env` ismini verin veya `npm run init` komutunu kullanın.

.env klasörüne ayrıca demo'nun bağlanacağı MongoDB connection string'ini de vermeniz gerekmekte.

```sh
$ npm run init
$ vim ./.env
```

- `serverless.yml` dosyası içerisine bir göz gezdirin.

- Serverless.js aracılığı ile deployment'i başlatın.

```sh
$ sls deploy
```

## Örnek GraphQL sorgusu:

Demo örnek bir graphql sorgusu:

```graphql
query getFilmList {
  film {
    title
    year
  }
}
```

Bu sorguya geri dönüş şunun benzeri olacak:

```json
{
  "data": {
    "film": [
      {
        "title": "Blade Runner",
        "year": 1982
      },
      {
        "title": "The Shawshank Redemption",
        "year": 1994
      },
      {
        "title": "Donnie Darko",
        "year": 2001
      },
      {
        "title": "The Man from Earth",
        "year": 2007
      },
      {
        "title": "Captain America: The Winter Soldier",
        "year": 2014
      }
    ]
  }
}
```

HTTP üzerinden bu sorguyu yapabilmek için GraphiQL benzeri bir arabirim veya cURL kullanabilirsiniz:

```sh
$ curl -X "POST" "https://nwg1aj7tfh.execute-api.eu-west-1.amazonaws.com/dev/" \
     -H "Content-Type: application/json" \
     -d $'{
  "query": "query getFilmList { film { _id, title, year } }"
}'
```

## Loglara erişmek:

Bir kere deploy işlemi yaptıktan sonra ilgili fonksiyona gelecek requestleri aşağıdaki komut ile izleyebilirsiniz.

```sh
$ sls logs -f index -t
```

index burada izleyeceğimiz fonksiyonun ismi.

## İptal etmek:

Deploy ettiğiniz bir projeyi komple geri çekmek için aşağıdaki komutu kullanabilirsiniz:

```sh
$ sls remove
```

## Testler ve Lint-Check

Testler için Jest kullanılmakta:

```sh
$ npm test
```

Lint için ise:

```sh
$ npm run lint
```
