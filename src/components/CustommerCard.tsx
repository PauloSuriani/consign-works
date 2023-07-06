import { useNavigate } from 'react-router-dom';

type CustommerProps = {
  id: number;
  contato?: string;
  razao_social?: string;
  nome_fantasia?: string;
  rua?: string;
  nro?: string;
  bairro?: string;
  telefone?: string;
  cnpj?: string;
  email?: string;
  cidade?: string;
  uf?: string;
}

export function CustommerCard(
  props: CustommerProps,
  toPrintQueue: Number[],
  navigate: any,
) {

  // const navigate = useNavigate();
  const showExpandedCard = () => {
    const expandedCard = document.getElementById('expanded-card');
    if (expandedCard) {
      expandedCard.style.display = 'block';
    }
  }

  return (
    <div className="CustommerCard" >
      {/* CAIXA DOS SVG */}
      <div className='upper-card mini-ver' id={`mini-card-version-${props['id']}`}>
        <div className='grow-try' >
          <div className="div-svg-custommer-card-sm-combo">
            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
            </svg>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', paddingInline: '7px', minWidth: '130px' }}>{props.contato}</div>
          </div>

          <div className="div-svg-custommer-card-sm-combo">
            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M17.592,8.936l-6.531-6.534c-0.593-0.631-0.751-0.245-0.751,0.056l0.002,2.999L5.427,9.075H2.491c-0.839,0-0.162,0.901-0.311,0.752l3.683,3.678l-3.081,3.108c-0.17,0.171-0.17,0.449,0,0.62c0.169,0.17,0.448,0.17,0.618,0l3.098-3.093l3.675,3.685c-0.099-0.099,0.773,0.474,0.773-0.296v-2.965l3.601-4.872l2.734-0.005C17.73,9.688,18.326,9.669,17.592,8.936 M3.534,9.904h1.906l4.659,4.66v1.906L3.534,9.904z M10.522,13.717L6.287,9.48l4.325-3.124l3.088,3.124L10.522,13.717z M14.335,8.845l-3.177-3.177V3.762l5.083,5.083H14.335z"></path>
            </svg>
            <div style={{ display: 'flex', fontWeight: '' }}>
              <div style={{ fontFamily: 'monospace', paddingInline: '5px', fontSize: '14px' }}>{props.cidade}</div>
              <span>{` - `}</span>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', paddingInline: '5px' }}>{props.uf}</div>
            </div>
          </div>
          {/* BUTTON CARD EXPAND */}
          <svg onClick={() => {
            {
              // const idName = `mini-card-version-${props['id']}`;
              const miniCard = document.getElementById(`mini-card-version-${props['id']}`);
              if (miniCard) miniCard.style.display = 'none';


              const expandedCard = document.getElementById(`expanded-card-${props['id']}`);
              if (expandedCard) {
                expandedCard.style.display = 'block';
              }
            }
          }} className="svg-printer-card" viewBox="0 0 20 20">
            <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
          </svg>
        </div>

        <div className="div-svg-custommer-card-sm-combo">

          <svg className="svg-custommer-card" viewBox="0 0 20 20">
            <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
          </svg>

          <div style={{ marginLeft: '4px', display: 'flex', alignItems: "center" }}>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', paddingLeft: '5px' }}>{props.rua}</div>



            <div style={{ fontFamily: 'monospace', paddingLeft: '0px', fontSize: '13px' }}>{`${props.nro === 'S/N'
              ? ''
              : ', '}`}
            </div>
            <div style={{ fontFamily: 'monospace', paddingLeft: '0px', fontSize: '13px' }}>{`${props.nro === 'S/N'
              ? ''
              : props.nro}`}
            </div>
            <div style={{ fontFamily: 'monospace', paddingLeft: '5px', fontSize: '13px' }}>{props.bairro}</div>
          </div>
        </div>
        <div className="div-svg-custommer-card-sm-combo">


          <svg className="svg-custommer-card" viewBox="0 0 20 20">
            <path d="M16.852,5.051h-4.018c0.131-0.225,0.211-0.482,0.211-0.761V3.528c0-0.841-0.682-1.522-1.521-1.522H8.478c-0.841,0-1.523,0.682-1.523,1.522V4.29c0,0.279,0.081,0.537,0.211,0.761H3.148c-0.841,0-1.522,0.682-1.522,1.523v9.897c0,0.842,0.682,1.523,1.522,1.523h13.704c0.842,0,1.523-0.682,1.523-1.523V6.574C18.375,5.733,17.693,5.051,16.852,5.051zM7.716,3.528c0-0.42,0.341-0.761,0.762-0.761h3.045c0.42,0,0.762,0.341,0.762,0.761V4.29c0,0.421-0.342,0.761-0.762,0.761H8.478c-0.42,0-0.762-0.34-0.762-0.761V3.528z M17.615,16.471c0,0.422-0.342,0.762-0.764,0.762H3.148c-0.42,0-0.761-0.34-0.761-0.762V9.62h15.228V16.471z M17.615,8.858H2.387V6.574c0-0.421,0.341-0.761,0.761-0.761h13.704c0.422,0,0.764,0.34,0.764,0.761V8.858z"></path>
          </svg>

          <div style={{ marginLeft: '9px', fontFamily: 'monospace', minWidth: '160px', fontSize: '14px' }}>{props.nome_fantasia ? props.nome_fantasia : props.razao_social}</div>
          {
            toPrintQueue.includes(props.id) ?
              <label className='consign-label'>
                {/* <input style={{ marginBottom: '5px', marginTop: '7px' }} type="radio" size={8} checked={toPrintQueue.includes(props['id'])} /> */}
                Consignação</label> : <label className='sale-label'>Venda</label>
          }

        </div>
      </div>

      {/* antigo card */}
      <div id={`expanded-card-${props['id']}`} style={{ display: 'none' }}>
        <div className='upper-card'>
          <div className='grow-try'>
            <div className="div-svg-custommer-card-sm-combo">
              <svg className="svg-custommer-card" viewBox="0 0 20 20">
                <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
              </svg>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', paddingInline: '6px', minWidth: '130px' }}>{props.contato}</div>
            </div>
            <div className="div-svg-custommer-card-sm-combo">
              <svg className="svg-custommer-card" viewBox="0 0 20 20">
                <path d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path>
              </svg>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', paddingInline: '5px', minWidth: '130px' }}>{props.telefone}</div>
            </div>
            <div className="div-svg-custommer-card-sm-combo">
              <svg className="svg-custommer-card" viewBox="0 0 20 20">
                <path d="M4.317,16.411c-1.423-1.423-1.423-3.737,0-5.16l8.075-7.984c0.994-0.996,2.613-0.996,3.611,0.001C17,4.264,17,5.884,16.004,6.88l-8.075,7.984c-0.568,0.568-1.493,0.569-2.063-0.001c-0.569-0.569-0.569-1.495,0-2.064L9.93,8.828c0.145-0.141,0.376-0.139,0.517,0.005c0.141,0.144,0.139,0.375-0.006,0.516l-4.062,3.968c-0.282,0.282-0.282,0.745,0.003,1.03c0.285,0.284,0.747,0.284,1.032,0l8.074-7.985c0.711-0.71,0.711-1.868-0.002-2.579c-0.711-0.712-1.867-0.712-2.58,0l-8.074,7.984c-1.137,1.137-1.137,2.988,0.001,4.127c1.14,1.14,2.989,1.14,4.129,0l6.989-6.896c0.143-0.142,0.375-0.14,0.516,0.003c0.143,0.143,0.141,0.374-0.002,0.516l-6.988,6.895C8.054,17.836,5.743,17.836,4.317,16.411"></path>
              </svg>
              <div style={{ fontFamily: 'monospace', paddingLeft: '5px', fontSize: '14px', textAlign: 'center' }}>{props.id}</div>
            </div>


            <svg onClick={() => {
              {
                const expandedCard = document.getElementById(`expanded-card-${props['id']}`);
                if (expandedCard) {
                  expandedCard.style.display = 'none';
                }
                const miniCard = document.getElementById(`mini-card-version-${props['id']}`);
                if (miniCard) miniCard.style.display = 'block';


              }
            }} className="svg-printer-card" viewBox="0 0 20 20">
              <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>          </svg>


          </div>


          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="div-svg-custommer-card-sm-combo">
              <svg className="svg-custommer-card" viewBox="0 0 20 20">
                <path d="M17.592,8.936l-6.531-6.534c-0.593-0.631-0.751-0.245-0.751,0.056l0.002,2.999L5.427,9.075H2.491c-0.839,0-0.162,0.901-0.311,0.752l3.683,3.678l-3.081,3.108c-0.17,0.171-0.17,0.449,0,0.62c0.169,0.17,0.448,0.17,0.618,0l3.098-3.093l3.675,3.685c-0.099-0.099,0.773,0.474,0.773-0.296v-2.965l3.601-4.872l2.734-0.005C17.73,9.688,18.326,9.669,17.592,8.936 M3.534,9.904h1.906l4.659,4.66v1.906L3.534,9.904z M10.522,13.717L6.287,9.48l4.325-3.124l3.088,3.124L10.522,13.717z M14.335,8.845l-3.177-3.177V3.762l5.083,5.083H14.335z"></path>
              </svg>
              <div style={{ display: 'flex', fontWeight: '' }}>
                <div style={{ fontFamily: 'monospace', paddingInline: '5px', fontSize: '14px' }}>{props.cidade}</div>
                <span>{` - `}</span>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', paddingInline: '5px' }}>{props.uf}</div>
              </div>
            </div>
            <div className="div-svg-custommer-card-sm-combo">
              <svg className="svg-custommer-card" viewBox="0 0 20 20">
                <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
              </svg>

              <div style={{ fontFamily: 'monospace', fontSize: '14px', paddingInline: '5px' }}>{`${props.email === '(não cadastrado)'
                ? '(não consta)'
                : props.email}`}
              </div>
            </div>
          </div>


          <div className="div-svg-custommer-card-sm-combo">

            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
            </svg>

            <div style={{ display: 'flex', alignItems: "center" }}>
              <div style={{ fontFamily: 'monospace', fontSize: '13px', paddingLeft: '5px' }}>{props.rua}</div>



              <div style={{ fontFamily: 'monospace', paddingLeft: '0px', fontSize: '13px' }}>{`${props.nro === 'S/N'
                ? ''
                : ', '}`}
              </div>
              <div style={{ fontFamily: 'monospace', paddingLeft: '0px', fontSize: '13px' }}>{`${props.nro === 'S/N'
                ? ''
                : props.nro}`}
              </div>
              <div style={{ fontFamily: 'monospace', paddingLeft: '5px', fontSize: '13px' }}>{props.bairro}</div>
            </div>
          </div>
        </div>





        {/* PARTE CADASTRAL */}
        <div className='lower-card'>

          <div>
            <div>
              <b><label style={{ fontFamily: 'monospace', fontSize: '14px', paddingRight: '5px' }}>Razão Social</label></b>
              <div style={{ fontFamily: 'monospace', minWidth: '160px', fontSize: '14px' }}>{props.razao_social}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div>
                <b><label style={{ fontFamily: 'monospace', fontSize: '14px', paddingRight: '5px' }}>Nome Fantasia</label></b>
                <div style={{ fontFamily: 'monospace', minWidth: '160px', fontSize: '14px' }}>{props.nome_fantasia}</div>
              </div>
              <div style={{ fontFamily: 'monospace', paddingLeft: '12px' }}>
                <b><label style={{ fontFamily: 'monospace', fontSize: '14px', paddingRight: '5px' }}>CNPJ</label></b>
                <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>{props.cnpj}</div>
              </div>
            </div>
          </div>

          <div className="div-svg-custommer-card-ckecked">
            {/* <input style={{ marginBottom: '5px', marginTop: '7px' }} type="radio" size={8} checked={toPrintQueue.includes(props['id'])} /> */}
            {
              toPrintQueue.includes(props.id) ?
                <label style={{ marginInlineEnd: '75px' }} className='consign-label'>
                  Consignação</label> :
                <div style={{ marginInlineEnd: '110px' }}>
                  <label style={{ marginInlineEnd: '6px' }} className='debt-label'>Cobrança</label>
                  <label  className='sale-label'>Venda</label>
                </div>
            }

            <svg onClick={() => { navigate(`/custommer/edit/${props['id']}`) }} className="svg-edit-card" viewBox="0 0 20 20">
              <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
            </svg>
          </div>
        </div>
      </div>

    </div>
  )
}
