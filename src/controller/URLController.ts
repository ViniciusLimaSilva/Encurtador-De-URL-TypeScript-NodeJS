import { Request, Response } from 'express';
import { config } from '../config/Constants';
import shortID from 'shortid';
import { URLmodel } from '../Database/model/URL';

export class URLController {
  public async shorten(request: Request, response: Response): Promise<void> {
    //ver se a url ja nao existe

    const { originURL } = request.body;
    const url = await URLmodel.findOne({ originURL });
    if (url) {
      response.json(url);
      return;
    }
    //criasr o hash para essa url
    const hash = shortID.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    //salvar a url no banco

    const newURL = await URLmodel.create({ hash, shortURL, originURL });
    //retornar a url  salva
    response.json({ originURL, hash, shortURL });
  }

  public async redirect(request: Request, response: Response): Promise<void> {
    //pegar o hash da url
    const { hash } = request.params;
    //encontrar a url original pelo hash pego
    const url = await URLmodel.findOne({ hash });
    if (url) {
      //redirecionar para a URL original a partir do que foi encontrado no BD
      response.redirect(url.originURL);
      return;
    }

    response.status(400).json({ error: 'URL não encontrada' });
  }
}
